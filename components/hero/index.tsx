
import { Box, Container, Typography, useTheme } from "@mui/material"

const Hero: React.FC = () => {
    const theme = useTheme()
    return(
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
            <Container 
                component='section'
                maxWidth='xl'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    minHeight: '500px'
                }}
            >
                <Typography variant="body1" color={theme.palette.primary.contrastText}>
                    The blog
                </Typography>
                <Typography variant="h1" color={theme.palette.primary.contrastText}>
                    Writing from my mind
                </Typography>
                <Typography variant="h4" color={theme.palette.primary.contrastText}>
                    Long story, journey, and times
                </Typography>
            </Container>
        </Box>
    )
}

export default Hero