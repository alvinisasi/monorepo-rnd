import { queries } from '@/queries'
import { Container, Typography, useTheme, Box } from '@mui/material'
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ColorRing } from 'react-loader-spinner'
import parse from 'html-react-parser'
import { About, AboutResponse } from '@/utils/types'

export const revalidate = 60

const About = ({
    dehydratedState,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const theme = useTheme()
    const { data, isLoading } = useQuery<AboutResponse[], Error>(
        queries.about.all()
    )

    if (data) {
        const attributes = data[0]?.attributes as About
        return (
            <Box sx={{ flexGrow: 1 }}>
                {isLoading ? (
                    <ColorRing
                        visible={true}
                        height='80'
                        width='80'
                        ariaLabel='color-ring-loading'
                        wrapperStyle={{}}
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
                        <Typography variant='body1'>
                            {parse(attributes.content)}
                        </Typography>
                    </Container>
                )}
            </Box>
        )
    }
    return (
        <Typography variant='body1' color={theme.palette.primary.contrastText}>
            No Posts
        </Typography>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(queries.about.all())

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate,
    }
}

export default About
