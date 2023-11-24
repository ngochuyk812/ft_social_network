import { MediaType } from "./mediaType.type"
import { User } from "./user.type"

export interface TypeLike {
  id:number,
  name: string,
  icon: string
}
export type PostItemCreate = {
    caption:string, audience : number, layout: number, medias:File[]
}

export type PostUpdate = {
    caption:string, audience : number, layout: number, medias:File[]
}

  export interface Post {
    caption: string;
    audience: number;
    layout: number;
    status: number;
    commentCount: number;
    likeCount: number;
    likeType: TypeLike | null;
    user: User;
    mediaPosts: MediaType[];
    id: number;
    createdDate: string;
    comments ?: PaginationComment
  }
  export interface DetailPost{
    idPost: number;
    active: number | 0;
  }

  export interface Pagination {
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    count: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  }

  export interface Comment{
    id: number;
    content: string;
    commentParent?: Comment;
    user: User;
    medias: MediaType[];
    createAt: string;
    parentId?: number;

  }



  export interface PaginationPost extends Pagination {
    data?: Post[];
  }
  export interface PaginationComment extends Pagination {
    data: Comment[];
  }
