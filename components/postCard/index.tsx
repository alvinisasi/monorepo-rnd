import { styled } from '@mui/material/styles';
import { Box, Card, CardContent, CardMedia, Container, Typography, useTheme } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import Image from 'next/image';
import { getDate } from '@/utils/helper';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { PostCardProps } from '@/utils/types';

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const PostCard: React.FC<PostCardProps> = ({ data, md }) => {
    const theme = useTheme()
    return(
        <Grid md={md} xs={12} key={data.title}>
            <Item variant='outlined' sx={{ height: 400 }}>
                <CardMedia sx={{ position: 'relative', width: '100%', height: '50%' }}>
                    <Image 
                        src={data.image}
                        alt={data.title}
                        fill
                        objectFit='cover'
                    />
                </CardMedia>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DateRangeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
                        <Typography variant='caption'>
                            {getDate(data.date)}
                        </Typography>
                    </Box>
                    <Typography variant='caption' fontStyle='italic'>
                        author: {data.author}
                    </Typography>
                    <Typography 
                        variant='h4' 
                        fontWeight='bold' 
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {data.title}
                    </Typography>
                    <Typography 
                        variant='body1'
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {data.description}
                    </Typography>
                </CardContent>
            </Item>
        </Grid>
    )
}

export default PostCard