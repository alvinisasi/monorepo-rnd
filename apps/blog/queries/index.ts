import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { posts } from "./posts";

export const queries = mergeQueryKeys(posts);