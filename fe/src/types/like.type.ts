import { Post } from "./post.type"

export interface TypeLike {
    id:number,
    name: string,
    icon: string
}


export interface Like{
    postId: number,
    userId: number,
    type: number,
    likeType: TypeLike,
    post:Post
}