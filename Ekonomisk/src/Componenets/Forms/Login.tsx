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
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/UseLogin";



const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();
  const {mutate:login} = useLogin();
  const navigate = useNavigate();

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     login(
       { email, password },
       {
         onSuccess: () => {          
           toast({
             title: "Login successful.",
             description: "Welcome back!",
             status: "success",
             duration: 3000,
             isClosable: true,
           });
           navigate("/AddIncome");
         },
         onError: (error: any) => {
           toast({
             title: "Login failed.",
             description:
               error?.response?.data?.message ||
               "Please check your credentials.",
             status: "error",
             duration: 3000,
             isClosable: true,
           });
         },
       }
     );
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
