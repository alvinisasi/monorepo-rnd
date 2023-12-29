import { Card, CardContent, CardMedia, Skeleton } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

const PostSkeleton: React.FC = () => {
    return (
        <Grid md={4} xs={12}>
            <Card>
                <CardMedia
                    sx={{ position: 'relative', width: '100%', height: '50%' }}
                >
                    <Skeleton variant='rectangular' height={100} />
                </CardMedia>
                <CardContent>
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                    <Skeleton variant='text' sx={{ fontSize: '1rem' }} />
                </CardContent>
            </Card>
        </Grid>
    )
}

export default PostSkeleton
