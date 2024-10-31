import { createApi } from '@reduxjs/toolkit/query/react'
import { authAxiosBaseQuery } from '../helperAxios'
import { Friend } from '../../types/user.type'

export const friendApi = createApi({
    reducerPath: 'friendApi',

    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        addFriend: build.mutation<Friend, number>({
            query: (id) => {
                return {
                    url: `api/friend/create_request`,
                    method: "POST",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                    },
                    data: {
                        idUser: id
                    }
                }
            }
        }),
        getFriends: build.query<Friend[], void>({
            query: () => {
                return {
                    url: `api/friend/create_request`,
                    method: "GET"
                }
            }
        }),
        rejectFriend: build.mutation<boolean, number>({
            query: (id) => {
                return {
                    url: `api/friend/reject`,
                    method: "POST",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                    },
                    data: {
                        idUser: id
                    }
                }
            }
        }),
        acceptFriend: build.mutation<boolean, number>({
            query: (id) => {
                return {
                    url: `api/friend/accept`,
                    method: "POST",
                    headers: {
                        'Content-Type': "application/x-www-form-urlencoded",
                    },
                    data: {
                        idUser: id
                    }
                }

            }
        })

    }),
})

export const { useAddFriendMutation, useRejectFriendMutation, useAcceptFriendMutation, useGetFriendsQuery } = friendApi