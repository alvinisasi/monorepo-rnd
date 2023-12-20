import { getPostDetail } from "@/services/posts";
import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

export const posts = createQueryKeys('posts', {
    all: null,
    detail: (userId: number) => ({
        queryKey: [userId],
        queryFn: getPostDetail(userId),
    }),
})