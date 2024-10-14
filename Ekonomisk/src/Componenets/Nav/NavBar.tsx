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
  Spinner,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import ColorModeSwitch from "./ColorModeSwitch";
import logo from "../../assets/logo.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useUserName from "../hooks/UseGetUsername";
import useUserId from "../hooks/UseGetUser";

const NavBar = () => {
  const authToken = localStorage.getItem("Guid");
  const logoSize = useBreakpointValue({ base: "60px", md: "80px" });
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { data: userId, isLoading: isUserIdLoading } = useUserId();
  const { data: username, isLoading: isUsernameLoading } = useUserName(userId);
  const navigate = useNavigate();

  if (isUserIdLoading || isUsernameLoading) {
    return <Spinner />;
  }

  const handleLogout = () => {
    localStorage.removeItem("Guid");
    navigate("/Login");
  };

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
            {authToken ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
              {authToken ? (
                <VStack>
                  {isUsernameLoading ? (
                    <Spinner size="sm" /> // Show loading spinner while username is being fetched
                  ) : (
                    <Avatar name={username} size="sm" />
                  )}
                  <Button size="sm" onClick={handleLogout}>
                    Logout
                  </Button>
                </VStack>
              ) : (
                <Button as={Link} to="/login" size={buttonSize}>
                  Login
                </Button>
              )}
            </VStack>
          </WrapItem>
        </Box>
        {!isUsernameLoading && username && (
          <Text display={{ base: "none", md: "block" }}>{username}</Text>
        )}
        <Show above="lg">
          <ColorModeSwitch />
        </Show>
      </HStack>
    </HStack>
  );
};

export default NavBar;
