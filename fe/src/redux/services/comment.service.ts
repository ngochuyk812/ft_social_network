import { createApi } from '@reduxjs/toolkit/query/react';
import { authAxiosBaseQuery } from '../helperAxios';
import { Comment, PaginationComment } from '../../types/post.type';
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        getPageCommentByIdPost: build.query<PaginationComment, { idPost: number, page: number }>({
            query: (data) => {
                return {
                    url: `api/comment/post/${data.idPost}/page/${data.page}`,
                    method: "GET"
                }
            },
            keepUnusedDataFor: 1
        }),
        deleteComment: build.mutation<boolean, { id: number }>({
            query: (data) => {
                return {
                    url: `api/comment/remove/${data.id}`,
                    method: "DELETE"
                }
            }
        }),
        createComment: build.mutation<Comment, { content: string, idPost?: number, idParent?: number, files: File[] }>({
            query: (data) => {
                const formData = new FormData();
                data.files.map((tmp: File) => {
                    formData.append("files", tmp)
                })
                formData.append("content", data.content)
                formData.append("idPost", data.idPost + "")
                if (data.idParent) {
                    formData.append("idParent", data.idParent + "")
                }
                return ({
                    url: `api/comment/create`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData,
                })
            }
        }),
        // removeLike: build.mutation<TypeLike[], {idPost: number}>({
        //     query: (data) => {
        //         return ({
        //             url: `api/like/remove`,
        //             method: 'POST',
        //             body: data,
        //           })
        //     }
        // })     
    }),
})

export const { useGetPageCommentByIdPostQuery, useCreateCommentMutation, useDeleteCommentMutation } = commentApi