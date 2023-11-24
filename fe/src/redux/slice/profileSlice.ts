import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { NotificationType } from '../../types/Index';
import {  PaginationPost } from '../../types/post.type';
import { User } from '../../types/user.type';
import { MediaType } from '../../types/mediaType.type';

const init ={medias:[], profile: undefined}
const initialState :{
  medias: MediaType[],
  profile?: User,
  
} = init

export const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    setMedia: (state, action)=>{
        state.medias = action.payload
      },
    cleanProfile:(state) =>{
      state = {...init};
    },
    setProfile:(state, action)=>{
      state.profile = action.payload
    }
  },
 
})
export const { setMedia, cleanProfile, setProfile} = profileSlice.actions
export default profileSlice.reducer
