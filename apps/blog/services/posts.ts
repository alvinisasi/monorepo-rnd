import { Post, PostResponse } from '@/utils/types'
import axios from 'axios'
import ky, { KyResponse } from 'ky'

const url = process.env.NEXT_PUBLIC_STRAPI_API || ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API || ''

export const getPosts = async (query: string) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }
    const posts = await ky(
        `${url}/api/posts?filters[title][$contains]=${query}&populate=*`,
        headers
    )
    return posts.json()
}

export const getPostDetail = async (slug: string) => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }
    const posts = await ky(
        `${url}/api/posts?filters[slug][$eq]=${slug}&populate=*`,
        headers
    )
    return posts.json()
}

export const getAllPosts = async () => {
    const headers = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    }
    const posts = await ky(`${url}/api/posts?populate=*`, headers)

    return posts.json()
}
