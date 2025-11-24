import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const customTheme = {
  palette: {
    primary: {
      main: '#75A1DE',
    },
    secondary: {
      main: '#d7d7d7',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
};
export const theme = createTheme(customTheme);
