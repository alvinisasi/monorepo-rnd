import { getPostsProps } from "@/utils/types"
import builder from "@builder.io/react"

builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

export const getPosts = async ({ limit, offset }: getPostsProps) => {
    const posts = await builder.getAll('blog-post', { prerender: true, limit: limit, offset: offset })
    return posts
}