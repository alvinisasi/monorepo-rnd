export interface Post {
    title: string
    description: string
    image: string
    author: string
    content: string
    category: string
    date: Date
    slug: string
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