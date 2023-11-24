import { createSlice } from '@reduxjs/toolkit'
import { TypeLike } from '../../types/like.type';


const initialState:{data?: TypeLike[]} = {
  data: undefined
}



export const likeTypeSlice = createSlice({
  name: 'likeTypeSlice',
  initialState,
  reducers: {
    setLikeType:(state, action) => {
      state.data = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLikeType} = likeTypeSlice.actions

export default likeTypeSlice.reducer