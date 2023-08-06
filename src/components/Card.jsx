"use client";

import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const Card = ({ data, type }) => {
  const songData = {
    name: "",
    artistsName: "",
    image: "",
    releaseDate: "",
  };

  if (type === "tracks") {
    songData.name = data.name;
    songData.artistsName = data.artists[0].name;
    songData.image = data.album.images[0].url;
    songData.releaseDate = data.album.release_date;
  } else if (type === "playlists") {
    songData.name = data.name;
    songData.image = data.images[0].url;
  }

  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"300px"}
        w={"full"}
        h={"full"}
        maxH={"350px"}
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
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {songData.artistsName}
          </Text>
          <Heading fontSize={"lg"} fontFamily={"body"} fontWeight={500}>
            {songData.name}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Text color={"gray.500"} fontSize={"md"}>
              {songData.releaseDate}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
};

export default Card;
