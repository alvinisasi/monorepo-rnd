import { IParams, PostResponse } from "@/utils/types"
import { Box, Container, Typography, useTheme } from "@mui/material"
import DateRangeIcon from '@mui/icons-material/DateRange';
import { getDate } from "@/utils/helper";
import Image from "next/image";
import parse from 'html-react-parser';
import { useQuery } from "@tanstack/react-query";
import { getPostDetail, getPosts } from "@/services/posts";
import { GetStaticProps, GetStaticPaths, InferGetStaticPropsType  } from 'next';
import Error from "next/error";
import { usePathname } from 'next/navigation'

const PostDetail = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const theme = useTheme()
    const pathname = usePathname()
    const { data } = useQuery({
        queryKey: ['posts/' + pathname],
        queryFn: () => getPostDetail(pathname || ''),
        initialData: posts[0]
    })
    const { attributes } = data

    if(attributes){
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
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API}${attributes.image.data.attributes.url}`}
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
    return <Error statusCode={404} />
}

export const getStaticPaths: GetStaticPaths = async () => {
    const data = await getPosts()
    const pathsWithParams = data?.map((item: PostResponse) => ({ params: { slug: item.attributes.slug }}))

    return {
        paths: pathsWithParams,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params as IParams
    const data = await getPostDetail(slug)
  
    return {
        props: {
            posts: data 
        },
        revalidate: 60
    }
}

export default PostDetail