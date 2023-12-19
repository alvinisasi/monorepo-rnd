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
import { Box, Container, Typography, useTheme } from "@mui/material";

let sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
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
    ]
};
let arr = [0, 1, 2, 3, 4]

const Home = () => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts()
    })

    console.log(data)
	const theme = useTheme()

    return (
      <>
        <Hero />
        {/* <Container sx={{ marginTop: 8, marginBottom: 8 }}>
            <Slider {...sliderSettings}>
            {
                isLoading ? 
                    arr.map(() => <PostSkeleton /> )
                    :
                    data && data?.length > 0 ? data?.map((post) => {
                        return <Box sx={{ padding: '1em' }}>
                            <PostCard data={post.data as Post} md={3} />
                        </Box>
                    }) : 
                    <Typography variant="body1" color={theme.palette.primary.contrastText}>
                        No Posts
                    </Typography>
            } 
            </Slider>
        </Container> */}
      </>
    );
}

export default Home
