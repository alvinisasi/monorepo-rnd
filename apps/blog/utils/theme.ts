import { createTheme } from '@mui/material/styles'

const light = {
    main: '#D5CEA3',
    light: '#E5E5CB',
    dark: '#1A120B',
    contrastText: '#3C2A21',
}

const dark = {
    main: '#041C32',
    light: '#04293A',
    dark: '#064663',
    contrastText: '#ECB365',
}

export const theme = createTheme({
    palette: {
        primary: dark,
    },
})
