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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Show,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  const userName = "";
  const logoSize = useBreakpointValue({ base: "60px", md: "80px" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <HStack spacing={4} justifyContent="space-between" p={4} wrap="wrap">
      <Image boxSize={logoSize} src={logo} alt="Logo" />

      {isMobile ? (
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem as={Link} to="/">
              Homepage
            </MenuItem>
            <MenuItem as={Link} to="/expenses">
              Expenses
            </MenuItem>
            <MenuItem as={Link} to="AddIncome">
              Income
            </MenuItem>
            {userName ? (
              <MenuItem>Logout</MenuItem>
            ) : (
              <MenuItem as={Link} to="/login">
                Login
              </MenuItem>
            )}
          </MenuList>
        </Menu>
      ) : (
        <>
          <Button as={Link} to="/">
            Homepage
          </Button>
          <Button as={Link} to="/expenses">
            Expenses
          </Button>
          <Button as={Link} to="AddIncome">
            Income
            </Button>
        </>
      )}

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
                <Button as={Link} to="/login" size={buttonSize}>
                  Login
                </Button>
              )}
            </VStack>
          </WrapItem>
        </Box>
        <Text display={{ base: "none", md: "block" }}>{userName}</Text>
        <Show above="lg">
          <ColorModeSwitch />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
