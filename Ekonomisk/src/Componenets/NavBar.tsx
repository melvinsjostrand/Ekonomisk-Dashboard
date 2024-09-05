import { HStack, Image} from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../assets/logo.png";



const NavBar = () => {
  return (
    <HStack justifyContent="space-between">
      <Image boxSize="80px" src={logo}></Image>
      <ColorModeSwitch></ColorModeSwitch>
    </HStack>
  );
};

export default NavBar;
