import { createSlice } from '@reduxjs/toolkit'
import { Message, Room } from '../../types/message';


const initialState: { rooms: Room[], roomSelect: number } = {
  rooms: [],
  roomSelect: -1
}
function removeDuplicates(arr: Message[]) {
  const uniqueIds = new Set();
  const result: Message[] = [];

  arr.forEach(item => {
    const id = item.id;

    if (!uniqueIds.has(id)) {
      uniqueIds.add(id);
      result.push(item);
    }
  });
  return Array.from(result);
}

export const messageSlice = createSlice({
  name: 'messageSlice',
  initialState,
  reducers: {

    setRooms: (state, action) => {
      state.rooms = action.payload
    },
    setRoomSelect: (state, action) => {
      console.log(action.payload);

      state.roomSelect = action.payload
    },
    addMessToRoom: (state, action) => {
      const data = action.payload.data
      const location = action.payload.location
      const roomId = action.payload?.roomId
      console.log(data, location, roomId);

      if (data.length === 0) {
        return;
      }
      const updatedRooms = state.rooms
      let roomIndex = state.roomSelect;
      if (roomId)
        roomIndex = roomId;

      if (roomIndex !== -1) {
        const room = updatedRooms.findIndex(f => f.id === roomIndex)
        const updatedRoom = { ...updatedRooms[room] };
        const oldMessages = updatedRoom?.messages ?? [];

        if (location >= 0) {
          updatedRoom.messages = [...oldMessages, ...data];
        } else {
          updatedRoom.messages = [...data, ...oldMessages];
        }
        updatedRoom.messages = removeDuplicates(updatedRoom.messages)
        updatedRooms[room] = updatedRoom;

        if (location >= 0) {
          const start = updatedRooms[0];
          updatedRooms[0] = updatedRooms[room]
          updatedRooms[room] = start
        }

      }
      state.rooms = updatedRooms
    }
  },
  extraReducers: () => {
  }
})

export const { setRooms, addMessToRoom, setRoomSelect } = messageSlice.actions

export default messageSlice.reducer