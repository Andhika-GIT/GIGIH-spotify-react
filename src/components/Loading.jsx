import {
  Flex,
  Heading,
  Spinner,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
const Loading = () => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} spacing={50}>
          <Heading fontSize={"6xl"} textAlign={"center"} color="white">
            Loading
          </Heading>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Loading;
