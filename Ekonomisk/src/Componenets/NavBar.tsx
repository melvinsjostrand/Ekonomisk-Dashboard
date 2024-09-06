import {HStack, Image, WrapItem, Avatar , Text, Box, VStack, Button} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.png";

const NavBar = () => {
 
  return (
    <HStack justifyContent="space-between">
      <Image boxSize="80px" src={logo} />

      <HStack>
        <Box>
          <WrapItem>
            <HStack>
              <Avatar name="Dan Abrahmov" />
              <Text>Dan Abrahmov</Text>
            </HStack>
            <VStack align="end">
              <Button colorScheme="red" size="sm" mt={2}>
                Logout
              </Button>
            </VStack>
          </WrapItem>
        </Box>
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
