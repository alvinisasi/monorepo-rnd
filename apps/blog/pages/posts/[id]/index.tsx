import { IParams, Post, PostDetailProps, PostResponse } from "@/utils/types"
import { Box, Container, Typography, useTheme } from "@mui/material"
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getDate } from "@/utils/helper";
import Image from "next/image";
import parse from 'html-react-parser';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { getPostDetail, getPosts } from "@/services/posts";
import { GetStaticProps, GetStaticPaths, NextPage  } from 'next';
import { queries } from "@/queries";
import { ColorRing } from  'react-loader-spinner'

const PostDetail: React.FC<PostDetailProps> = (props) => {
    const theme = useTheme()
    // const dataSession = typeof window !== 'undefined' && sessionStorage.getItem('post-details')
    // const data: Post = JSON.parse(dataSession as string) as Post
    // const { data } = useQuery({
    //     queryKey: ['posts'],
    //     queryFn: () => getPostDetail(props.id)
    // })
    const { attributes } = props.data

    if (attributes){
        return(
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
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API}${attributes.image.data.attributes?.url}`}
                        alt={attributes.title}
                        fill
                        objectFit='cover'
                    />
                </Box>
                
                <Typography variant='body2'>
                    {parse(attributes.content)}
                </Typography>
            </Container>
        )
    } 

    return <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
    />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getPosts()
    const  pathsWithParams = data?.map((item: PostResponse) => ({ params: { id: item.id.toString() }}))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params as IParams
    
    // const data = useQuery(queries.posts.detail(parseInt(id)))
    const data = await getPostDetail(parseInt(id))
    console.log(`DATA POST `, data);
    
    // const queryClient = new QueryClient()
  
    // await queryClient.prefetchQuery({ queryKey: ['posts'], queryFn: () => getPostDetail(parseInt(id)) })
  
    return {
        props: {
            // dehydratedState: dehydrate(queryClient),
            data: data?.data as PostResponse
        },
        revalidate: 60
    }
}

export default PostDetail