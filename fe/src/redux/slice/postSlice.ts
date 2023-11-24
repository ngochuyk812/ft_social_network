import { createSlice } from '@reduxjs/toolkit'
import { PaginationPost, Post} from '../../types/post.type';

const initialState: {data?: PaginationPost} = {
  data: undefined
};

export const postSlice = createSlice({
  name: 'postSlice',
  initialState, 
  reducers: {
    setData: (state, action)=>{
      if(state.data ){
        const dataNew = action.payload?.data ?? [];
        const dataOld = state.data.data ?? [];
        state.data.count += action.payload.count
        state.data.pageIndex += action.payload.pageIndex
        state.data.data = [...dataOld,...dataNew]
      }else{
        state.data = action.payload
      }
    },
    setPostSelect: (state, action)=>{
      
      state.data = {
        pageIndex: 0,
        pageSize: 0,
        totalPage: 0,
        count: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        data: [action.payload]
      }
    },
    addReaction:(state, action)=>{
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){
          if(!tmp.likeType){
            tmp.likeCount++
          }
          tmp.likeType = action.payload.type
        }
      })
      if(state.data){
        state.data.data = [...dataPage]
      }
    },
    setPaginationComment:(state, action)=>{
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){

          const cmt = tmp.comments;

          const pagi = action.payload.data

          if(cmt){
            const dataNew = pagi?.data ?? [];
            const dataOld = cmt.data ?? [];
            if(tmp.comments){
            tmp.comments.count += pagi.count
            tmp.comments.pageIndex = pagi.pageIndex
            tmp.comments.data = [...dataOld,...dataNew]
            }
          }else{
            tmp.comments = pagi
          }
        }
      })
    },
    addComments:(state, action) => {
      const data  = action.payload.data ?? [];
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){
          
          let dataOld = tmp.comments?.data ?? [] ;
          dataOld = [...data, ...dataOld] ?? [];
          if(tmp.comments)
          tmp.comments.data  = dataOld ;
        }})
    },
    removePost: (state, action)=>{
      if(state.data ){
        const idRemove = action.payload ?? [];
        const dataOld = state.data.data?.filter(f=>f.id !== idRemove) ?? [];
        state.data.count += action.payload.count
        state.data.pageIndex += action.payload.pageIndex
        state.data.data = [...dataOld]
      }else{
        state.data = action.payload
      }
    },
    cleanComment:(state, action)=>{
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){
          tmp.comments  = undefined ;
        }})
    },
    removeCommentById:(state, action)=>{
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){
          
          let dataOld = tmp.comments?.data ?? [] ;
          dataOld = dataOld.filter(f=>f.id !== action.payload.idComment) ?? [];
          
          if(tmp.comments)
          tmp.comments.data  = dataOld ;
        }})
    },
    cleanPost:(state)=>{
      state.data = undefined

    },
    removeReaction:(state, action)=>{
      const dataPrev = state.data
      const dataPage = dataPrev?.data || [];
      dataPage?.forEach((tmp:Post)=>{
        if(tmp.id === action.payload.id){
          tmp.likeType = null;
          tmp.likeCount--
        }
      })
      if(state.data){
        state.data.data = [...dataPage]
      }
    }
  },

})

export const { setData, addReaction, removeReaction, setPaginationComment, addComments, cleanComment, cleanPost, removeCommentById, removePost, setPostSelect} = postSlice.actions

export default postSlice.reducer