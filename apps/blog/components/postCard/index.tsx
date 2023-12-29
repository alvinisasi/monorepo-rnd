import { styled } from '@mui/material/styles'
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Typography,
    useTheme,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Image from 'next/image'
import { getDate } from '@/utils/helper'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { PostCardProps } from '@/utils/types'
import { useRouter } from 'next/navigation'

const Item = styled(Card)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}))

const PostCard: React.FC<PostCardProps> = ({ data, md }) => {
    const theme = useTheme()
    const router = useRouter()

    return (
        <Grid
            md={md}
            xs={12}
            key={data.title}
            sx={{ animation: '2s anim-lineUp ease-out' }}
        >
            <Item variant='outlined' sx={{ height: 550 }}>
                <CardMedia
                    sx={{ position: 'relative', width: '100%', height: '50%' }}
                >
                    <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API}${data.image.data.attributes.url}`}
                        alt={data.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={true}
                        placeholder='empty'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                </CardMedia>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DateRangeIcon
                            style={{ fontSize: '14px', marginRight: '4px' }}
                        />
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
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {data.title}
                    </Typography>
                    <Typography
                        variant='body1'
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {data.description}
                    </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        sx={{
                            marginBottom: 8,
                        }}
                        variant='outlined'
                        onClick={() => {
                            router.push(`/posts/${data.slug}`)
                            sessionStorage.setItem(
                                'post-details',
                                JSON.stringify(data)
                            )
                        }}
                    >
                        <Typography color={theme.palette.primary.contrastText}>
                            View More
                        </Typography>
                    </Button>
                </CardActions>
            </Item>
        </Grid>
    )
}

export default PostCard
