import { getPostDetail } from "@/services/posts";
import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

export const posts = createQueryKeys('posts', {
    all: null,
    detail: (slug: string) => ({
        queryKey: [slug],
        queryFn: getPostDetail(slug),
    }),
})