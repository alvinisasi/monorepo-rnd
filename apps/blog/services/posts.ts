import { createQueryKeys } from '@lukemorales/query-key-factory'
import axios from 'axios'

const url = process.env.NEXT_PUBLIC_STRAPI_API ?? ''
const token = process.env.NEXT_PUBLIC_STRAPI_TOKEN_API ?? ''

export const getPosts = async () => {
    const headers = { 
        headers: { 
            'Authorization': 'Bearer ' + token
        } 
    }
    const posts = await axios.get(`${url}api/posts`, headers)
    return posts.data
}

export const postsKey = createQueryKeys('posts', {
    list: (filters) => ({
        queryKey: [{ filters }],
        queryFn: (ctx) => getPosts,
    }),
})