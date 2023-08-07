"use client";

import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Spacer,
  Button,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const Card = ({ data, type, onClick }) => {
  const songData = {
    name: "",
    artistsName: "",
    image: "",
    releaseDate: "",
  };

  if (type === "tracks" || type === "playlist-tracks") {
    songData.name = data.name;
    songData.artistsName = data.artists[0].name;
    songData.image = data.album.images[0].url;
    songData.releaseDate = data.album.release_date;
  } else if (type === "playlists") {
    songData.name = data.name;
    songData.image = data.images[0].url;
  }

  const onCardClick = () => {
    if (type === "playlists") {
      onClick(data.id);
    }
  };

  const onButtonClick = () => {
    if (type === "playlist-tracks") {
      onClick(data.uri);
    }
  };

  return (
    <Center
      py={12}
      onClick={onCardClick}
      style={{ cursor: `${type === "playlists" ? "pointer" : ""}` }}
    >
      <Box
        role={"group"}
        p={6}
        maxW={"300px"}
        w={"full"}
        minH={"450px"}
        maxH={"450px"}
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
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${songData.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={songData.image}
            alt="#"
          />
        </Box>
        <Flex direction="column" gap={3} pt={20} height="100%">
          <Stack>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              {songData.artistsName}
            </Text>
            <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
              {songData.name}
            </Heading>
          </Stack>
          <Spacer />
          {type === "playlist-tracks" && (
            <Button
              onClick={onButtonClick}
              px={4}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Remove from playlist
            </Button>
          )}
        </Flex>
      </Box>
    </Center>
  );
};

export default Card;
