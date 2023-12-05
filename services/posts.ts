import builder from "@builder.io/react"

builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

export const getPosts = async () => {
    const posts = await builder.getAll('blog-post', { prerender: false})
    return posts
}