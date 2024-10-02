import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import useCreateAccount from "../hooks/UseCreateAcc";

const CreateForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [pastSavings, setPastSavings] = useState<number>(0);

  const Name = `${firstname} ${lastname}`;

  const mutation = useCreateAccount(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Name && email && password) {
      mutation.mutate({
        name: Name,
        email,
        password,
        pastSavings,
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
        Create account
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="firstname" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="text" onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl id="lastname" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl id="pastSavings">
            <FormLabel>Past Savings</FormLabel>
            <Input
              type="number"
              onChange={(e) => setPastSavings(e.target.valueAsNumber)}
            />
          </FormControl>

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

          <Button type="submit" colorScheme="blue" size="lg" width="full">
            Create account
          </Button>
          <Text textAlign="center" mt="4">
            Already have an account?{" "}
            <Button as={Link} to="/Login" color="teal.500" fontWeight="bold">
              Login now
            </Button>
          </Text>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateForm;
