import { Box, Container, Typography, useTheme } from "@mui/material"
import { useEffect, useRef } from "react"
import Typed from 'typed.js';

const Hero = () => {
    const theme = useTheme()
    const textRef = useRef(null)

    useEffect(() => {
        const typed = new Typed(textRef.current, {
            strings: ['Being chiller is a hard work, but you must be chilled, dude.'],
            typeSpeed: 50,
            loop: true
        });
    
        return () => {
            typed.destroy();
        };
    }, [])

    return(
        <Box sx={{ backgroundColor: theme.palette.primary.main }} width='100%'>
            <Box 
                component='section'
                maxWidth='xl'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '100%',
                    minHeight: '100vh',
                    position: 'relative'
                }}
            >
                <Box sx={{
                    minHeight: '600px',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover'
                }}>
                    <video autoPlay loop muted style={{
                        objectFit: 'cover',
                        position: 'absolute',
                        inset: '0px',
                        width: '100%',
                        maxHeight: '100vh',
                        opacity: 0.5
                    }}>
                        <track src="" kind="captions" srcLang="en" label="no_caption"></track>
                        <source
                            src="media/bg.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <Container sx={{
                        position: 'absolute',
                        inset: '0px',
                        maxWidth: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <Typography variant="body1" color={theme.palette.primary.contrastText}>
                            The blog
                        </Typography>
                        <Typography variant="h2" color={theme.palette.primary.contrastText} fontFamily='Merriweather' fontWeight='900' fontStyle='italic' mb={3} sx={{
                            animation: '2s anim-lineUp ease-out',
                        }} ref={textRef} />
                        <Typography variant="h4" color={theme.palette.primary.contrastText} fontFamily='Open Sans' sx={{
                            animation: '2s anim-lineUp ease-out',
                        }}>
                            Long story, journey, and times
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </Box>
    )
}

export default Hero