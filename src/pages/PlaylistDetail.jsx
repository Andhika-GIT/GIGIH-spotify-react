import { useEffect, useState } from "react";

import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Wrap,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

// utils
import { removePlaylistItem, getPlaylistsDetail } from "../utils";

// component
import { Card, Loading } from "../components";

// react-router
import { useHistory } from "react-router-dom";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const PlaylistDetail = () => {
  const { playlistId } = useParams();

  const [playlist, setplaylist] = useState();
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [user, setUser] = useState();

  const history = useHistory();

  const getPlaylist = async () => {
    let result;
    let object;

    result = await getPlaylistsDetail(playlistId);
    console.log(result);

    if (result.status === 401) {
      localStorage.removeItem("token");
      history.replace("/signIn");
    } else {
      object = localStorage.getItem("user");
      setUser(JSON.parse(object));
      setplaylist(result);
      setPlaylistTracks(result.tracks.items);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const onRemoveItem = async (trackUri) => {
    console.log(trackUri);

    const response = await removePlaylistItem(playlistId, trackUri.toString());
    console.log(response);
    if (response.status === 200) {
      getPlaylist();
    }
  };

  if (!playlist) return <Loading />;
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        w={"full"}
        h={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"500px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${playlist.images[0].url})`,
            filter: "blur(20px)",
            opacity: "35%",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Flex
            gap="20px"
            alignItems={{ base: "start", lg: "center" }}
            direction={{ base: "column", lg: "row" }}
          >
            <Image
              rounded={"lg"}
              height={400}
              width={400}
              objectFit={"cover"}
              src={playlist.images[0].url}
              alt="#"
            />
            <VStack align="start">
              <Heading
                fontWeight={600}
                fontSize={{
                  base: "xl",
                  md: "2xl",
                  lg: "4xl",
                  xl: "6xl",
                  "2xl": "8xl",
                }}
                lineHeight={"110%"}
              >
                {playlist.name}
              </Heading>
              <Flex alignItems={"center"} gap={"10px"} mt="30px">
                <Avatar
                  size={"xs"}
                  src={
                    user.images
                      ? user.images[1].url
                      : "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <Text fontSize={"sm"} fontWeight="700">
                  {user.display_name} .
                </Text>
                <Text
                  fontSize={"sm"}
                  fontWeight="700"
                >{`${playlist.tracks.items.length} songs`}</Text>
              </Flex>
              <Text fontSize="md">{playlist.description}</Text>
            </VStack>
          </Flex>
        </Box>
        <Stack pt={20}>
          <Text fontSize="xl" align={"center"}>
            Tracks on this playlist
          </Text>
          <Wrap spacing="20px">
            {playlistTracks.map((item, index) => {
              return (
                <WrapItem key={item.track.id}>
                  <Card
                    data={item.track}
                    type="playlist-tracks"
                    onClick={onRemoveItem}
                  />
                </WrapItem>
              );
            })}
          </Wrap>
        </Stack>
      </Box>
    </Center>
  );
};

export default PlaylistDetail;
