import { createApi } from '@reduxjs/toolkit/query/react'
import { Post, PostItemCreate } from '../../types/post.type'
import { authAxiosBaseQuery } from '../helperAxios'

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        createPost: build.mutation<any, PostItemCreate>({
            query: (post) => {
                const formData = new FormData();
                post.medias.map((tmp: File) => {
                    formData.append("files", tmp)
                })
                formData.append("audience", post.audience + "")
                formData.append("layout", post.layout + "")
                formData.append("caption", post.caption)
                return ({
                    url: `api/post/create`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData,
                })
            },
        }),

        getPostLiked: build.query<Post[], void>({
            query: () => {
                return ({
                    url: `api/post/liked`,
                    method: 'GET',
                })
            },
            keepUnusedDataFor: 0
        }),
        removePostById: build.mutation<boolean, { id: number }>({
            query: (data) => {
                return ({
                    url: `api/post/remove/${data.id}`,
                    method: 'DELETE',
                })
            }
        }),
        getPostById: build.query<Post, { id: number }>({
            query: (data) => {
                return ({
                    url: `api/post/${data.id}`,
                    method: 'GET',
                })
            },
            keepUnusedDataFor: 0
        })

    }),
})

export const { useCreatePostMutation, useGetPostLikedQuery, useRemovePostByIdMutation, useGetPostByIdQuery } = postApi