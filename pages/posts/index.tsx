'use client'

import { styled } from '@mui/material/styles';
import builder from "@builder.io/react"
import { Box, Container, Typography, useTheme } from "@mui/material"
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Unstable_Grid2"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query"

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

const Item = styled(Paper)(({ theme }) => ({
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
                        data && data?.length > 0 ? data?.map((post, index) => {
                            const data = post.data as Post
                            return (
                                <Grid xs={4}>
                                    <Item variant='outlined'>
                                        <Typography variant='h4'>{data.title}</Typography>
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