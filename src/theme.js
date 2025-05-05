import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // podés personalizar con otro color
    },
    secondary: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
