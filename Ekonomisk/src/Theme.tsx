import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
};

const colors = {
  brand: {
    50: "#d1fae5",
    100: "#a7f3d0",
    200: "#6ee7b7",
    300: "#34d399",
    400: "#10b981",
    500: "#059669",
    600: "#047857",
    700: "#065f46",
    800: "#064e3b",
    900: "#032b20",
  },
  dark: {
    bg: "#1A202C", 
    cardBg: "#2D3748", 
    text: "#E2E8F0", 
    primary: "#81E6D9", 
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: "dark.bg", 
        color: "dark.text", 
      },
    },
  },
});

export default theme;
