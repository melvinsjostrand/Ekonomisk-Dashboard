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
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { text, use } from "framer-motion/client";

interface CreateFormProps {
  onSubmit: (email: string, password: string, Name: string) => void;
}

const CreateForm: React.FC<CreateFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [Firstname, setFirstName] = useState<String>("");
  const [Lastname, setLastName] = useState<String>(""); 
  const Name = `${Firstname} ${Lastname}`;

  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
      onSubmit(email, password, Name);
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
          <FormControl id="Firstname" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type="Text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl id="LastName" isRequired>
            <FormLabel>Last name</FormLabel>
            <Input type="Text" onChange={(e) => setLastName(e.target.value)} />
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
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CreateForm;
