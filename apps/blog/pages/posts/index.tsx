import { Box, Container, Typography, useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { Post, PostResponse } from '@/utils/types'
import PostCard from '@/components/postCard'
import { useEffect, useState } from 'react'
import PostSkeleton from '@/components/postSkeleton'
import Input from '@/components/input'
import { getPosts } from '@/services/posts'
import { queries } from '@/queries'
import { useDebounce } from '@/utils/hooks'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export const revalidate = 60

const Posts = ({
    dehydratedState,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [posts, setPosts] = useState<Post[]>([])
    const [search, setSearch] = useState<string>('')
    const debounceValue = useDebounce(search, 500)
    const { isLoading, data } = useQuery<PostResponse[], Error>(
        queries.posts.all(debounceValue)
    )

    useEffect(() => {
        if (!isLoading) {
            let postData = data?.map((post: PostResponse) => post.attributes)
            setPosts(postData as Post[])
        }
    }, [isLoading])
    let arr = [0, 1, 2]

    const theme = useTheme()

    const handleSearch = (value: string) => {
        setSearch(value)
        const result = data?.filter((item: PostResponse) =>
            item.attributes.title.toLowerCase().includes(value.toLowerCase())
        )

        let postData = result?.map((post: PostResponse) => post.attributes)
        setPosts(postData as Post[])
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Container>
                <Typography
                    variant='h3'
                    color={theme.palette.primary.contrastText}
                    sx={{
                        margin: 8,
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    Posts
                </Typography>
                <Input
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Grid container spacing={4}>
                    {isLoading ? (
                        arr.map((item, index) => <PostSkeleton key={index} />)
                    ) : posts && posts.length > 0 ? (
                        posts.map((post) => {
                            return (
                                <PostCard md={4} data={post} key={post.slug} />
                            )
                        })
                    ) : (
                        <Typography
                            variant='body1'
                            color={theme.palette.primary.contrastText}
                        >
                            No Posts
                        </Typography>
                    )}
                </Grid>
            </Container>
        </Box>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(queries.posts.all(''))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate,
    }
}

export default Posts
