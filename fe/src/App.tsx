import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import Router from './router/Router'
import ListNotification from './component/Notification/ListNotification'
import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './redux/store'
import { SignalrContext } from './helper/contextSignalr'
import { Notification as Notifi, NotificationType, SignalRRes } from './types/Index'
import { addNotify } from './redux/slice/notifySlice'
import { Message } from './types/message'
import { addMessToRoom } from './redux/slice/messageSlice'
import Loading from './component/Loading/Loading'

function App() {
  const [connection, setConnection] = useState<null | HubConnection>(null);
  const token = useSelector((state:RootState)=>state.auth.user?.accessToken)
  const id = useSelector((state:RootState)=>state.auth.user?.id)

  const dispatch = useDispatch();
  useEffect(() => {
      
    const connect = new HubConnectionBuilder()
      .withUrl("https://localhost:7210/hubs/notification",{
        transport: HttpTransportType.WebSockets,
        accessTokenFactory: () => {
            return `${token}`
        }})
      .withAutomaticReconnect()
      .build();
        
    setConnection(connect);
    
  }, [token]);

  
  useEffect(() => {
    if (connection) {

      connection
        .start()
        .then(() => {
          
          connection.on("Receive", ( res : SignalRRes) => {
            
            if(res.type == 1){
              const dataRes =  res.data
              const n = dataRes as Notifi

              if(n.type === 0){
                dispatch(addNotify({message:"Bài viết", description: n.from.fullName+" đã thích bài viết của bạn", type:'success'}))
              }
              if(n.type === 1){
                dispatch(addNotify({message:"Bài viết", description: n.from.fullName+" đã bình luận bài viết của bạn", type:'success'}))
              }
              if(n.type === 2){
                  dispatch(addNotify({message:"Bạn bè", description: n.from.fullName+" đã gửi lời mời kết bạn đến bạn", type:'success'}))
              }
              if(n.type === 3){
                dispatch(addNotify({message:"Bạn bè", description: n.from.fullName+" đã chấp nhận lời mời kết bạn đến bạn", type:'success'}))
              }
              if(n.type === 4){
                dispatch(addNotify({message:"Bình luận", description: n.from.fullName+" đã trả lời bình luận đến bạn", type:'success'}))
              }
              if(n.type === 5){
                dispatch(addNotify({message:"Tin nhắn", description: n.from.fullName+" đã gửi cho bạn một tin nhắn", type:'success'}))
              }
            }

            if(res.type === 0){
              const dataRes =  res.data
              const m = dataRes as Message
              dispatch(addMessToRoom({data: [m], location: 1,roomId: m.roomId}))
              if(m.userId !== id )
              dispatch(addNotify({message:"Tin nhắn", description: m.user.fullName+" đã gửi cho bạn một tin nhắn", type:'success'}))

            }
            
          });
        })
        .catch((error) => console.log(error));
    }

  }, [connection]); 
  const isLoading = useSelector((state:RootState) => state.auth);

  return (
    <SignalrContext.Provider value={connection}>
      <div className="App">
        <ListNotification/>
        <Router/>
        {(isLoading.loading && !isLoading.lockLoading) &&  <Loading/>}
      </div>
    </SignalrContext.Provider>
    
  )
}



export default App
