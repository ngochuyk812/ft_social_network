import { createApi } from '@reduxjs/toolkit/query/react'
import { authAxiosBaseQuery } from '../helperAxios'
import { Message, MessageCreate, PaginationMessage, Room } from '../../types/message'

export const messageApi = createApi({
    reducerPath: 'message',
    
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        getRoom: build.query<Room[], void>({
            query: () => {
                return ({
                    url: `api/room`,
                    method: 'GET',
                    
                  })
            },
          }),
        getRoomById: build.query<Room, {id:number}>({
            query:(data)=>{
                return ({
                    url: `api/room/${data.id}`,
                    method:'GET'
                })
            }
        }),
        getRoomOrCreate: build.query<Room, {user:number}>({
            query:(data)=>{
                return ({
                    url: `api/room/getorcreate/${data.user}`,
                    method:'GET'
                })
            }
        }),
        getMessageByRoom: build.query<PaginationMessage, {id:number, page:number}>({
            query:(data)=>{
                return ({
                    url: `api/room/${data.id}/page/${data.page}`,
                    method:'GET'
                })
            }
        }),
        createMessage: build.mutation<Message, MessageCreate>({
            query: (message) => {
                const formData = new FormData();
                message.medias.map((tmp : File)=>{
                formData.append("files", tmp)
                })
                formData.append("message", message.message + "")
                formData.append("room", message.room + "")
                return ({
                    url: `api/room/send`,
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                    },
                    data: formData,
                  })
            },
          }),
    }),
})

export const {useGetRoomQuery, useGetRoomByIdQuery, useGetMessageByRoomQuery, useCreateMessageMutation, useGetRoomOrCreateQuery} = messageApi