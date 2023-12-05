'use client'

import Hero from "@/components/hero";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "@/components/postSkeleton";
import PostCard from "@/components/postCard";
import { Post } from "@/utils/types";
import { Container, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"

let sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    styles: {
        display: 'grid',
        spacing: 4
    }
};
let arr = [0, 1, 2, 3, 4]

const Home = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts()
    })
	const theme = useTheme()

    return (
        <>
			<Hero />
            <Container>
                <Grid container spacing={4} mt={8} >
                {
                    isLoading ? 
                        arr.map(() => <PostSkeleton /> )
                        :
                        data && data?.length > 0 ? data?.map((post) => {
                            return <PostCard data={post.data as Post} md={3} />
                        }) : 
                        <Typography variant="body1" color={theme.palette.primary.contrastText}>
                            No Posts
                        </Typography>
                } 
                </Grid>
            </Container>
        </>
    );
}

export default Home
