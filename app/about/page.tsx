'use client'

import { Container, Typography, useTheme, Box } from "@mui/material"

const About = () => {
    const theme = useTheme()
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography 
                    variant="h3" 
                    color={theme.palette.primary.contrastText}
                    sx={{ margin: 8, textAlign: 'center', fontWeight: 'bold' }}
                >
                    About
                </Typography>
            </Container>
        </Box>
    )
}

export default About