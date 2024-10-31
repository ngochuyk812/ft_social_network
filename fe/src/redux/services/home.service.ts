import { createApi } from '@reduxjs/toolkit/query/react'
import { PaginationPost } from '../../types/post.type'
import { authAxiosBaseQuery } from '../helperAxios'
import { User } from '../../types/user.type'

export const homeApi = createApi({
    reducerPath: 'home',

    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        getPostByPage: build.query<PaginationPost, number>({
            query: (pageIndex) => {
                return {
                    url: `api/post/page/${pageIndex}`,
                    method: "GET"
                }
            },
            keepUnusedDataFor: 0
        }),
        searchByQuery: build.query<User[], string>({
            query: (q) => {
                return {
                    url: `api/user/search/${q}`,
                    method: "GET"
                }
            },
            keepUnusedDataFor: 0
        }),
    }),
})

export const { useGetPostByPageQuery, useSearchByQueryQuery } = homeApi