import { IParams, PostResponse } from "@/utils/types"
import { Box, Container, Typography, useTheme } from "@mui/material"
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getDate } from "@/utils/helper";
import Image from "next/image";
import parse from 'html-react-parser';
import { HydrationBoundary, QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType  } from 'next';
import { usePathname } from 'next/navigation'
import { queries } from "@/queries";
import { ColorRing } from 'react-loader-spinner'
import PostSkeleton from "@/components/postSkeleton";

const PostDetail = ({ dehydratedPost }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const theme = useTheme()
    const pathname = usePathname()
    const { data, isError, isLoading } = useQuery(queries.posts.detail(pathname?.replace('/posts/', '') || ''))
    let arr = [0, 1, 2, 3, 4]

    if(data && !isError){
        const attributes =  data[0].attributes
        return(
            <HydrationBoundary state={dehydratedPost}>
                {
                    isLoading ? 
                        <ColorRing 
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> :
                        <Container>
                            <Typography 
                                variant="h3" 
                                color={theme.palette.primary.contrastText}
                                sx={{ margin: 8, textAlign: 'center', fontWeight: 'bold' }}
                            >
                                {attributes.title}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <DateRangeIcon style={{ fontSize: '14px', marginRight: '4px' }} />
                                <Typography variant='caption'>
                                    {getDate(attributes.date)}
                                </Typography>
                            </Box>
                            <Typography variant='caption' fontStyle='italic'>
                                author: {attributes.author}
                            </Typography>
                            <Box sx={{ position: 'relative', width: '100%', minHeight: 450, marginTop: 8, marginBottom: 8 }}>
                                <Image 
                                    src={`${process.env.NEXT_PUBLIC_STRAPI_API}${attributes.image.data.attributes.url}`}
                                    alt={attributes.title}
                                    fill
                                    objectFit='cover'
                                    priority={true}
                                />
                            </Box>
                            
                            <Typography variant='body1'>
                                {parse(attributes.content)}
                            </Typography>
                        </Container>
                }
            </HydrationBoundary>
        )
    } 
    return arr.map((item, index) => <PostSkeleton key={index}/> )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getPosts('')
    const pathsWithParams = data?.map((item: PostResponse) => ({ params: { slug: item.attributes.slug }}))

    return {
        paths: pathsWithParams,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params as IParams

    const queryClient = new QueryClient()
    queryClient.prefetchQuery(queries.posts.detail(slug.replace('/posts/', '')))
  
    return {
        props: {
            dehydratedPost: dehydrate(queryClient)
        },
        revalidate: 60
    }
}

export default PostDetail