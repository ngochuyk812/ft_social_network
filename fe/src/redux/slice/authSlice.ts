import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserData } from "../../types/user.type";

const getUserFromStorage = ()=>{
  const user = localStorage.getItem('user')
  if(user)
  return JSON.parse(user)
  return user
}
const initialState:{user?: UserData, status : string} = {
  user: getUserFromStorage() ?? null,
  status : ""
}


const updateUserFromStorage = async () => {
  const userFromStorage = getUserFromStorage();
  initialState.user = userFromStorage;
};

updateUserFromStorage();

const saveUser = (data : any)=>{
    localStorage.setItem('user', JSON.stringify(data) )
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logout:(state) => {
      localStorage.removeItem('user')
      state.user = undefined
    },
    setLogin:(state, action) => {
      saveUser(action.payload)
      state.user = action.payload
    },
    updateProfile:(state, action)=>{
      state.user = {...action.payload, accessToken: state.user?.accessToken, refreshToken: state.user?.refreshToken}
    }
  }
})

// Action creators are generated for each case reducer function
export const { logout, setLogin, updateProfile} = authSlice.actions

export default authSlice.reducer