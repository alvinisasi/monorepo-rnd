import { styled } from '@mui/material/styles';
import builder from "@builder.io/react"
import { Box, Card, CardContent, CardMedia, Container, Typography, useTheme } from "@mui/material"
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Unstable_Grid2"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"
import Image from 'next/image';
import { getDate } from '@/utils/helper';
import DateRangeIcon from '@mui/icons-material/DateRange';

export interface Post {
    title: string
    description: string
    image: string
    author: string
    content: string
    category: string
    date: Date
}

export const revalidate = 60

builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

const getPosts = async () => {
    const posts = await builder.getAll('blog-post', { prerender: false})
    return posts
}

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const Pages = () => {
    const { data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts()
    })

    const theme = useTheme()
    return(
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography 
                    variant="h3" 
                    color={theme.palette.primary.contrastText}
                    sx={{ margin: 8, textAlign: 'center', fontWeight: 'bold' }}
                >
                    Posts
                </Typography>
                <Grid container spacing={2}>
                    {
                        data && data?.length > 0 ? data?.map((post) => {
                            const data = post.data as Post
                            return (
                                <Grid md={4} xs={12} key={data.title}>
                                    <Item variant='outlined'>
                                        <CardMedia>
                                            <Image 
                                                src={data.image}
                                                alt={data.title}
                                                width={200}
                                                height={200}
                                            />
                                        </CardMedia>
                                        <CardContent>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <DateRangeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
                                                <Typography variant='caption'>
                                                    {getDate(data.date)}
                                                </Typography>
                                            </Box>
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
                        }) : 
                        <Typography variant="body1" color={theme.palette.primary.contrastText}>
                            No Posts
                        </Typography>
                    }
                </Grid>
            </Container>
        </Box>
    )
}

export async function getStaticProps() {
    const queryClient = new QueryClient()
  
    await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: getPosts })
  
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: revalidate
    }
  }

export default Pages