import builder from "@builder.io/react"

builder.init(process.env.NEXT_PUBLIC_BUILDERIO_API_KEY || '')

export const getAbout = async () => {
    const about = await builder.getAll('about', { prerender: false})
    return about
}