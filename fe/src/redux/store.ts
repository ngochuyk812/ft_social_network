import { Middleware, MiddlewareAPI, ThunkMiddleware, configureStore} from '@reduxjs/toolkit'
import postSlice from './slice/postSlice'
import notifySlice from './slice/notifySlice'
import authSlice from './slice/authSlice'
import { loginApi } from './services/login.service'
import { homeApi } from './services/home.service'
import { likeApi } from './services/like.service'
import likeTypeSlice from './slice/likeTypeSlice'
import { commentApi } from './services/comment.service'
import commentSlice from './slice/commentSlice'
import profileSlice from './slice/profileSlice'
import { profileApi } from './services/profile.service'
import { friendApi } from './services/friend.service'
import { messageApi } from './services/message.service'
import { postApi } from './services/post.service'
import messageSlice from './slice/messageSlice'

  export const store = configureStore({
  reducer: {
    post: postSlice,
    notify : notifySlice,
    auth : authSlice,
    likeType: likeTypeSlice,
    comment: commentSlice,
    profile: profileSlice,
    room: messageSlice,
    [loginApi.reducerPath] : loginApi.reducer,
    [homeApi.reducerPath] : homeApi.reducer,
    [likeApi.reducerPath] : likeApi.reducer,
    [commentApi.reducerPath] : commentApi.reducer,
    [profileApi.reducerPath] : profileApi.reducer,
    [friendApi.reducerPath] : friendApi.reducer,
    [messageApi.reducerPath] : messageApi.reducer,
    [postApi.reducerPath] : postApi.reducer



  },
  middleware: getDefaultMiddleware => getDefaultMiddleware()
  .concat([
    loginApi.middleware,
    homeApi.middleware,
    likeApi.middleware,
    commentApi.middleware,
    profileApi.middleware,
    friendApi.middleware,
    messageApi.middleware,
    postApi.middleware
    

  ])

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

