import { getPostsProps } from "@/utils/types"
import axios from "axios"
// import builder from "@builder.io/react"

// builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

// export const getPosts = async ({ limit, offset }: getPostsProps) => {
//     const posts = await builder.getAll('blog-post', { prerender: true, limit: limit, offset: offset })
//     return posts
// }

const url = process.env.NEXT_PUBLIC_STRAPI_API || ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API || ''

export const getPosts = async () => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const posts = await axios.get(`${url}/api/posts?populate=*`, headers)
    return posts.data.data
}

export const getPostDetail = async (id: number) => {
    const headers = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    const posts = await axios.get(`${url}/api/posts/${id}?populate=*`, headers)
    return posts.data.data
}
