import {HStack, Image, WrapItem, Avatar , Text, Box, VStack, Button} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../../assets/logo.png";
import User from "../hooks/user";
const NavBar = () => {
 const userName = "";
  return (
    <HStack justifyContent="space-between">
      <Image boxSize="80px" src={logo} />

      <HStack>
        <Box>
          <WrapItem>
            <VStack spacing={1}>
              {userName ? (
                <>
                <Avatar name={userName} /><Button size='1px'>Logout</Button>
                </>
              ):(
                <Button>Login</Button>
              )}
            </VStack>
          </WrapItem>
        </Box>
        <Text>{userName}</Text>
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
