import { Post } from "@/utils/types"
import { Box, Container, Typography, useTheme } from "@mui/material"
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getDate } from "@/utils/helper";
import Image from "next/image";

const PostDetail = () => {
    const theme = useTheme()
    const dataSession = typeof window !== 'undefined' && sessionStorage.getItem('post-details')
    const data: Post = JSON.parse(dataSession as string) as Post
    console.log(data);
    
    return(
        <Container>
            <Typography 
                variant="h3" 
                color={theme.palette.primary.contrastText}
                sx={{ margin: 8, textAlign: 'center', fontWeight: 'bold' }}
            >
                {data.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <DateRangeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
                <Typography variant='caption'>
                    {getDate(data.date)}
                </Typography>
            </Box>
            <Typography variant='caption' fontStyle='italic'>
                author: {data.author}
            </Typography>
            <Box sx={{ position: 'relative', width: '100%', minHeight: 450, marginTop: 8, marginBottom: 8 }}>
                <Image 
                    src={data.image}
                    alt={data.title}
                    fill
                    objectFit='cover'
                />
            </Box>
            
            <Typography variant='body2'>
                author: {data.content}
            </Typography>
        </Container>
    )
}

export default PostDetail