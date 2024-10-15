import {
  HStack,
  Switch,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const switchColorScheme = useColorModeValue("red", "green");

  const textFontSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <HStack>
      <Switch
        colorScheme={switchColorScheme}
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size={useBreakpointValue({ base: "md", md: "lg" })}
      ></Switch>
      <Text fontSize={textFontSize} whiteSpace="nowrap">
        Dark mode
      </Text>
    </HStack>
  );
};

export default ColorModeSwitch;
