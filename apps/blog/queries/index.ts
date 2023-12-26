import { createQueryKeyStore } from "@lukemorales/query-key-factory";
import { getPostDetail, getPosts } from "@/services/posts";
import { getAbout } from "@/services/about";


export const queries = createQueryKeyStore({
    posts: {
        all: (query: string) => ({
            queryKey: ['posts'],
            queryFn: () => getPosts(query)
        }),
        detail: (slug: string) => ({
            queryKey: [slug],
            queryFn: () => getPostDetail(slug),
            onError: (err: Error) => err
        }),
    },
    about: {
        all: () => ({
            queryKey: ['about'],
            queryFn: () => getAbout()
        })
    }
})