import { BaseQueryApi, BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { RootState } from "./store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { setLoading } from "./slice/authSlice";
axios.defaults.withCredentials = true


export const optionFetchBaseQuery = { 
    baseUrl: import.meta.env.VITE_URL_BE, 
    prepareHeaders : (headers :Headers, { getState, dispatch  } : {getState:any, dispatch: any})=>{
      const token = (getState() as RootState).auth.user?.accessToken
      headers.set('authorization', `Bearer ${token}`)
      return headers;
    }
  }



  const authAxiosBaseQuery = (
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      headers?: AxiosRequestConfig['headers'];

    },
    Pick<BaseQueryApi, "getState" | "extra" | "endpoint" | "type" | "forced">,
    unknown
  > => async ({ url, method, data, headers }:{url:string, method?: string , data?: any, headers?:any},api) => {
    try {
      api.dispatch(setLoading(true))

      const token = (api.getState() as RootState).auth.user?.accessToken
      
      const result = await axios({ url: import.meta.env.VITE_URL_BE + url, method, data,withCredentials: true, headers:{
        "Authorization":`Bearer ${token}`,
        "Content-type" : "application/json; charset=utf-8",
        ...headers,

      }});
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      if(err.response?.status === 401){
        
        window.location.href = "/login"

      }
      return { error: { status: err.response?.status, data: err.response?.data } };
    } finally{
      api.dispatch(setLoading(false))
    }
  };
  
export { authAxiosBaseQuery};