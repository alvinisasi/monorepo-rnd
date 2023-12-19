import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { postsKey } from "./posts";

export const queryKeys = mergeQueryKeys(postsKey)