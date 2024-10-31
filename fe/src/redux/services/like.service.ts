import { createApi } from '@reduxjs/toolkit/query/react';
import { TypeLike } from "../../types/like.type";
import { authAxiosBaseQuery } from '../helperAxios';
export const likeApi = createApi({
    reducerPath: 'likeApi',
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        getTypeLikes: build.query<TypeLike[], void>({
            query: () => {
                return ({
                    url: `api/like/get_type`,
                    method: 'GET',
                })
            },
        }),
        createLike: build.mutation<TypeLike[], { idPost: number, type: number }>({
            query: (data) => {
                return ({
                    url: `api/like/create`,
                    method: 'POST',
                    data: data,
                })
            }
        }),
        removeLike: build.mutation<TypeLike[], { idPost: number }>({
            query: (data) => {
                return ({
                    url: `api/like/remove`,
                    method: 'POST',
                    data: data,
                })
            }
        })
    }),
})

export const { useGetTypeLikesQuery, useCreateLikeMutation, useRemoveLikeMutation } = likeApi