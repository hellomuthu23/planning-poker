import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
export const customTheme = {
  palette: {
    primary: {
      main: "rgb(0, 62, 81)",
    },
    secondary: {
      main: "#d7d7d7",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
};
export const theme = createMuiTheme(customTheme);
