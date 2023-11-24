import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import {PaginationPost } from '../../types/post.type'

import { authAxiosBaseQuery } from '../helperAxios'
import { Friend, UpdateProfile, User, UserData } from '../../types/user.type'
import { MediaType } from '../../types/mediaType.type'
import { Notification } from '../../types/Index'

export const profileApi = createApi({
    reducerPath: 'profileAPI',
    
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        getPostByPageAndUser: build.query<PaginationPost, {index: number, idUser: number}>({
            query: (data) => {
                return {
                    url: `api/post/page/${data.index}/user/${data.idUser}`,
                    method: "GET"
                }
            },
            keepUnusedDataFor:0.001

          }),
          getMediaUser: build.query<MediaType[], {idUser: number}>({
            query: (data) => {
                return {
                    url: `api/user/${data.idUser}/media`,
                    method: "GET"
                }
            },
            keepUnusedDataFor:0.001
          }),  
          getListFriend : build.query<Friend[], {idUser: number}>({
            query: (data)=>{
                return {
                    url: `api/friend/${data.idUser}`,
                    method: "GET"
                }
            }
          }),  
          getListRequestFriend : build.query<Friend[], null>({
            query: ()=>{
                return {
                    url: `api/friend/request`,
                    method: "GET"
                }
            }
          }),  
          getProfileById : build.query<User, number>({
            query: (id)=>{
                return {
                    url: `api/user/${id}`,
                    method: "GET"
                }
            }
          }),
          getNotification : build.query<Notification[], void>({
            query: ()=>{
                return {
                    url: `api/notification`,
                    method: "GET"
                }
            }
          }),  
          updateProfile: build.mutation<UserData, UpdateProfile >({
            query: (data)=>{
                return {
                    url: `api/user/update`,
                    method: "POST",
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                    data
                }
            }
          })
          
    }),
})

export const {useGetPostByPageAndUserQuery, useGetMediaUserQuery, useGetListFriendQuery, useGetListRequestFriendQuery, useGetProfileByIdQuery, useGetNotificationQuery, useUpdateProfileMutation} = profileApi