import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'
import { LoginType } from '../../types/user.type'
import { authAxiosBaseQuery } from '../helperAxios'

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
    }),
})

export const {useLoginMutation} = loginApi