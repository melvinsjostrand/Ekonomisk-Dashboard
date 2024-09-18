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

interface CreateFormProps {
  onSubmit: (email: string, password: string, Name: string, PastSavings:number) => void;
}

const CreateForm = ({onSubmit,}: CreateFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Firstname, setFirstName] = useState<String>("");
  const [Lastname, setLastName] = useState<String>("");
  const [PastSavings, setPastSavings] = useState<number>(0);
  const Name = `${Firstname} ${Lastname}`;


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(email, password, Name, PastSavings);
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
          <FormControl id="Firstname" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input type="Text" onChange={(e) => setFirstName(e.target.value)} />
          </FormControl>
          <FormControl id="LastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input type="Text" onChange={(e) => setLastName(e.target.value)} />
          </FormControl>
          <FormControl id="PastSavings">
            <FormLabel>Past savings</FormLabel>
            <Input
              type="Number"
              onChange={(e) => setPastSavings(e.target.valueAsNumber)}
            ></Input>
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
