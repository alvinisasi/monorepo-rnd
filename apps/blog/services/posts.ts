import { PostResponse } from '@/utils/types'
import axios from 'axios'
import { client } from './client'

const url = process.env.NEXT_PUBLIC_STRAPI_API || ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API || ''

export const getPosts = async (query: string) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }
    const posts = await axios.get(
        `${url}/api/posts?filters[title][$contains]=${query}&populate=*`,
        headers
    )
    return posts.data.data
}

export const getPostDetail = async (slug: string): Promise<PostResponse[]> => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }
    const posts = await axios.get(
        `${url}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
        headers
    )
    return posts.data.data
}
