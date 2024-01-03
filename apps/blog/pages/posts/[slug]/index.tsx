import { APIResponse, IParams, Post, PostResponse } from '@/utils/types'
import { Box, Container, Typography, useTheme } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { getDate } from '@/utils/helper'
import Image from 'next/image'
import parse from 'html-react-parser'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { getPosts } from '@/services/posts'
import {
    GetStaticProps,
    GetStaticPaths,
    InferGetStaticPropsType,
    GetStaticPathsResult,
} from 'next'
import { queries } from '@/queries'
import { ColorRing } from 'react-loader-spinner'
import PostSkeleton from '@/components/postSkeleton'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ParsedUrlQuery } from 'querystring'

const revalidate = 60

const PostDetail = ({
    dehydratedState,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const theme = useTheme()
    const { asPath } = useRouter()
    const { data, isError, isLoading } = useQuery<APIResponse, Error>(
        queries.posts.detail(asPath?.replace('/posts/', '') || '')
    )
    let arr = [0, 1, 2, 3, 4]
    useEffect(() => console.log(data), [])

    if (data?.data && !isLoading && !isError) {
        const attributes = data.data[0]?.attributes as Post
        return (
            <>
                {isLoading ? (
                    <ColorRing
                        visible={true}
                        height='80'
                        width='80'
                        ariaLabel='color-ring-loading'
                        wrapperClass='color-ring-wrapper'
                        colors={[
                            '#e15b64',
                            '#f47e60',
                            '#f8b26a',
                            '#abbd81',
                            '#849b87',
                        ]}
                    />
                ) : (
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
                            {attributes.title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <DateRangeIcon
                                style={{ fontSize: '14px', marginRight: '4px' }}
                            />
                            <Typography variant='caption'>
                                {getDate(attributes.date)}
                            </Typography>
                        </Box>
                        <Typography variant='caption' fontStyle='italic'>
                            author: {attributes.author}
                        </Typography>
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                minHeight: 450,
                                marginTop: 8,
                                marginBottom: 8,
                            }}
                        >
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
                )}
            </>
        )
    }
    return arr.map((item, index) => <PostSkeleton key={index} />)
}

export const getStaticPaths = async () => {
    const data = (await getPosts('')) as APIResponse
    const queryClient = new QueryClient()

    // await queryClient.prefetchQuery(queries.posts.all(''))
    // const data = await queryClient.getQueryData(['posts'])
    const pathsWithParams =
        data?.data &&
        data?.data.map((item: PostResponse) => ({
            params: { slug: item.attributes.slug },
        }))
    console.log('pathsWithParams', pathsWithParams)

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    } as GetStaticPathsResult
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params as IParams

    const queryClient = new QueryClient()
    queryClient.prefetchQuery(queries.posts.detail(slug.replace('/posts/', '')))

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate,
    }
}

export default PostDetail
