import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import useCreateAccount from "../hooks/UseCreateAcc";

const CreateForm = () => {
  const Guid = localStorage.getItem("Guid");
  const [mail, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstName] = useState<string>("");
  const [lastname, setLastName] = useState<string>("");
  const [pastSavings, setPastSavings] = useState<number>(0);
  const navigate = useNavigate();
  const username = `${firstname} ${lastname}`;
  const toast = useToast();
  const { mutate: CreateAcc } = useCreateAccount();
  const emailRegex = /^[a-zåäöA-ZÅÄÖ0-9._%+-]+@(gmail.com|yahoo.com|outlook.com|hotmail.com)$/;
 
  
  console.log(Guid);
  useEffect(() => {
    
    if(Guid){
    navigate("/")
  }
}, [Guid, navigate])


  const handleSubmit = (e: React.FormEvent) => {
    if (!emailRegex.test(mail)) {
      toast({
        title: "Error",
        description: "Please enter a valid email from Gmail, Yahoo, Outlook, or Hotmail.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    e.preventDefault();
    if (!username || !mail || !password) {
      toast({
        title: "Error",
        description:
          "Please fill out name, email and password before submitting",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const data = {
      username,
      mail,
      password,
      pastSavings,
    };
    CreateAcc(data, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Account created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "There was an error creating your account.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });
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
              value={mail}
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
