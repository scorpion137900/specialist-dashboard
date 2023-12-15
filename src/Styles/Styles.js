import { createTheme } from "@mui/material";
//Customize Theme
const theme = createTheme({
  palette: {
    // main: "#0071BC",
    main: "#4154f1",

    text: {
      main: "#757575",
      secondary: "#2f2e41",
    },
    bg: "#E6F1F9",
    light: {
      main: "#fff",
      secondary: "#F0F0F0",
    },
    primary: {
      // main: "#0071BC",
      main: "#4154f1",
    },
    transparent: "transparent",
    pending: {
      main: "#F9A825",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1350,
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});
export default theme;
