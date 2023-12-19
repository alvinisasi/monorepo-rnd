import { createTheme } from "@mui/material/styles";

const primary = {
    main: '#D5CEA3',
    light: '#E5E5CB',
    dark: '#1A120B',
    contrastText: '#3C2A21',
}

export const theme = createTheme({
 palette: {
   primary: primary,
 },
});