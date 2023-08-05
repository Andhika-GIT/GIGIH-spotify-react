import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";

const SignIn = ({ loginUrl }) => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} spacing={50}>
          <Heading fontSize={"6xl"} textAlign={"center"} color="#1DB954">
            SpotSenja
          </Heading>
          <a href={loginUrl}>
            <Button
              bg={"white"}
              color={"black"}
              py={5}
              px={10}
              boxShadow="dark-lg"
              variant="solid"
            >
              Sign In
            </Button>
          </a>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default SignIn;
