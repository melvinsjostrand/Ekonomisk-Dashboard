import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useToast,
  Text,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import useLogin from "../hooks/UseLogin";



const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const mutation = useLogin(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      mutation.mutate(
        { email, password },
        {
          onSuccess: (data) => {
            toast({
              title: "Login successful",
              description: "You have been logged in.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          },
          onError: (error) => {
            toast({
              title: "Login failed",
              description: "Invalid Password or Email. Please try again.",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          },
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt="10"
      p="8"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading textAlign="center" mb="6">
        <RxAvatar />
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            width="full"
          >
            Login
          </Button>
          <Text textAlign="center" mt="4">
            Don't have an account?{" "}
            <Button as={Link} to="/register" color="teal.500" fontWeight="bold">
              Make one now
            </Button>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default LoginForm;
