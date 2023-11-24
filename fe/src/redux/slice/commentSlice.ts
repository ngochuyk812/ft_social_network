import { createSlice } from '@reduxjs/toolkit'
import { PaginationComment } from '../../types/post.type';


const initialState:{data?: PaginationComment, idPost:number} = {
  data: undefined,
  idPost: -1
}



export const commentSlice = createSlice({
  name: 'commentSlice',
  initialState,
  reducers: {
    addComments:(state, action) => {
      const data  = action.payload ?? [];
      let dataOld = state.data?.data ?? [] ;
      dataOld = [...dataOld, ...data];
      if(state.data)
      state.data.data  = dataOld;
    },
    cleanComment:(state)=>{
      state.data = undefined;
    },
    setPaginationComment:(state, action) => {
      const pagi = action.payload.data
      if(state.data && state.idPost === action.payload.idPost){
        const dataNew = pagi?.data ?? [];
        const dataOld = state.data.data ?? [];
        state.data.count += pagi.count
        state.data.pageIndex = pagi.pageIndex
        state.data.data = [...dataOld,...dataNew]
      }else{
        state.data = pagi
        state.idPost = action.payload.idPost
      }
    }
  }
})

export const { addComments, setPaginationComment, cleanComment} = commentSlice.actions

export default commentSlice.reducer