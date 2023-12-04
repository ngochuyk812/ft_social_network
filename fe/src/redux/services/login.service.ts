import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { LoginType, SignUpType } from '../../types/user.type'
import { authAxiosBaseQuery } from '../helperAxios'
import { VeryForgotPassword } from '../../types/Index'

export const loginApi = createApi({
    reducerPath: 'login',
    
    baseQuery: authAxiosBaseQuery(),
    endpoints: (build) => ({
        login: build.mutation<any, LoginType>({
            query: (data) => {
                return ({
                    url: `api/auth/sign_in`,
                    method: 'POST',
                    data: data,
                  })
            },
          }),
        signup: build.mutation<any, SignUpType>({
            query: (data) => {
                const vericationPath = window.location.origin + "/verification" 
                return ({
                    url: `api/auth/sign_up`,
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {...data, vericationPath},
                  })
            },
        }),
        forgot: build.mutation<any, string>({
            query: (data) => {
                return ({
                    url: `api/auth/forgot_password?userOrEmail=${data}`,
                    method: 'POST'
                  })
            },
        }),
        very_forgot: build.mutation<any, VeryForgotPassword>({
            query: (data) => {
                return ({
                    url: `api/auth/very_forgot_password`,
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {...data},
                  })
            },
        }),
        verification: build.query<any, {token?:string}>({
            query: (data) => {
                return ({
                    url: `api/auth/very_account/${data.token}`,
                    method: 'GET',
                  })
            },
        }),
    }),
})

export const {useLoginMutation, useSignupMutation, useVerificationQuery, useVery_forgotMutation, useForgotMutation} = loginApi