import {
  HStack,
  Image,
  WrapItem,
  Avatar,
  Text,
  Box,
  VStack,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../../assets/logo.png";

const NavBar = () => {
  const userName = "";
  const logoSize = useBreakpointValue({ base: "60px", md: "80px" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <HStack
      spacing={4}
      justifyContent="space-between"
      p={4}
      wrap="wrap"
    >
      <Image boxSize={logoSize} src={logo} alt="Logo" />

      <HStack spacing={4} alignItems="center">
        <Box>
          <WrapItem>
            <VStack spacing={1} align="start">
              {userName ? (
                <>
                  <Avatar name={userName} size="sm" />
                  <Button size={buttonSize}>Logout</Button>
                </>
              ) : (
                <Button size={buttonSize}>Login</Button>
              )}
            </VStack>
          </WrapItem>
        </Box>
        <Text display={{ base: "none", md: "block" }}>{userName}</Text>
        <ColorModeSwitch />
      </HStack>
    </HStack>
  );
};

export default NavBar;
