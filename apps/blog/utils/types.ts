import { ParsedUrlQuery } from "querystring"

export interface Post {
    title: string
    description: string
    image: Image
    author: string
    content: string
    category: string
    date: Date
    slug: string
}

export interface PostResponse {
    id: number
    attributes: Post
}

export interface PostCardProps {
    data: Post
    md: number
}

export interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: string
}

export interface getPostsProps {
    limit: number
    offset: number
}

export interface Image {
    data: ImageData
}
  
export interface ImageData {
    id: number
    attributes: ImageAttributes
}
  
export interface ImageAttributes {
    name: string
    alternativeText: any
    caption: any
    width: number
    height: number
    formats: ImageFormats
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: any
    provider: string
    provider_metadata: any
    createdAt: string
    updatedAt: string
}
  
export interface ImageFormats {
    thumbnail: ImageThumbnail
    small: ImageSmall
}
  
export interface ImageThumbnail {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
}
  
export interface ImageSmall {
    name: string
    hash: string
    ext: string
    mime: string
    path: any
    width: number
    height: number
    size: number
    url: string
}
  
export interface IParams extends ParsedUrlQuery {
    id: string
    slug: string
}

export interface PostDetailProps {
    data: PostResponse
}

export interface HeaderProps {
    url: string;
    label: string;
}