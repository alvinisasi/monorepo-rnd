import { Box, Container, Typography } from '@mui/material'

const Footer: React.FC = () => {
    const date = new Date()

    return (
        <Box
            component='footer'
            sx={{
                padding: '32px',
                marginTop: '16px',
                width: '100%',
            }}
        >
            <Container sx={{ width: '100%' }}>
                <Typography textAlign='center'>
                    &copy; Copyright {date.getFullYear()}, Alvin Miftah
                </Typography>
            </Container>
        </Box>
    )
}

export default Footer
