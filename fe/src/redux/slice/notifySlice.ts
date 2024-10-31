import { createSlice } from '@reduxjs/toolkit'
import { NotificationType } from '../../types/Index';

const initialState: {
  list: NotificationType[],
  notification_account: Notification[]
} = {
  list: [],
  notification_account: []
}

export const notifySlice = createSlice({
  name: 'notifySlice',
  initialState,
  reducers: {
    addNotify: (state, action) => {
      const item: NotificationType = {
        id: new Date().getTime(),
        message: action.payload.message,
        description: action.payload.description,
        type: action.payload.type
      }
      state.list = [...state.list, item]
    },
    removeNotify: (state, action) => {
      let oldData: NotificationType[] = [...state.list]
      oldData = oldData.filter((tmp: NotificationType) => {
        return tmp.id !== action.payload
      })
      state.list = oldData
    },
    setNotification: (state, action) => {
      state.notification_account = [...action.payload, ...state.notification_account]
    }
  },

})
export const { addNotify, removeNotify, setNotification } = notifySlice.actions
export default notifySlice.reducer
