import React, { useState,useEffect, useRef, MouseEventHandler, useContext } from 'react';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { HttpTransportType, HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { RootState } from '../../redux/store';
import { useCreateMessageMutation, useGetMessageByRoomQuery, useGetRoomByIdQuery, useGetRoomQuery } from '../../redux/services/message.service';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { CiMenuFries } from "react-icons/ci";

import {  User } from '../../types/user.type';
import Input from '../../component/Input/Input';
import { PaginationMessage, Message, Room, } from '../../types/message';
import { Input as TypeInput } from '../../types/Index';
import Line from '../../component/LayoutMedia/Line';
import { useParams } from 'react-router-dom';
import { SignalrContext } from '../../helper/contextSignalr';
import { addMessToRoom, setRoomSelect, setRooms } from '../../redux/slice/messageSlice';
import converDate from '../../helper/converDate';
import MenuAction from '../../component/MenuAction/MenuAction';


const ItemUserMessage = ({user, onSelect, messNotSeen}:{user:User, onSelect:MouseEventHandler<HTMLDivElement>, messNotSeen:Message[]})=>{
  const message = messNotSeen[messNotSeen.length-1]
  return (
    <div className='item_friend' onClick={onSelect} >
          <img width={50} height={50} style={{borderRadius:'50%'}} src={user.avatar ?? "https://www.phanmemninja.com/wp-content/uploads/2023/06/avatar-facebook-dep-2.jpeg"}/>
          <div className='info_friend_right' style={{overflow:'hidden'}}>
              <p className='text-nowrap' style={{color:'#4399FF', fontWeight:600, textOverflow:'ellipsis'}}>{user.fullName}</p>
              <p style={{textOverflow:'ellipsis'}}>{message.mediaMessages?.find(f=>f.type === "TEXT")?.src ?? ""}</p>
          </div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <AiOutlineCheckCircle color={'#4399FF'}/>             {/* DDax xem  */}


          </div>
    </div>
  )
}

function Messages() {
  const connection = useContext(SignalrContext)
    const roomSelect = useSelector((state: RootState)=>state.room.roomSelect);
    const rooms = useSelector((state: RootState)=>state.room.rooms);
    const {data:getRooms} = useGetRoomQuery();
    const [openList, setOpenList] = useState(true); 
    const {q} = useParams()
    const dispatch = useDispatch()

    const handleAddMessToRoom = (data: Message[], location: number, roomId?:number)=>{
      dispatch(addMessToRoom({data,location, roomId}))
    }

    const id =  useSelector((state:RootState)=>state.auth.user?.id)
    useEffect(()=>{
      if(getRooms)
      dispatch(setRooms(getRooms))
      
      
    },[getRooms])
    useEffect(()=>{
      return ()=>{
        dispatch(setRoomSelect(-1))
      }
      
    },[])

      useEffect(()=>{
        if(q && roomSelect == -1){
          const index = rooms.find(tmp=>tmp.id ===  Number(q))?.id ?? roomSelect
          dispatch(setRoomSelect(index))
        }
        
      },[rooms])

    const initListUser = ()=>{
      return rooms?.map((tmp:Room, index : number)=>{
        if(!tmp.participants){
          return
        }
        const par = tmp.participants.filter(tmp=>tmp.userId !== id)[0];
        const user = par.user;
        
        const messNotSeen = tmp.messages.filter(f=>f.status === 0)
        if(messNotSeen.length === 0){
          messNotSeen.push(tmp.messages[tmp.messages.length - 1])
        }
        
        return <ItemUserMessage user={user} messNotSeen = {messNotSeen} onSelect ={()=>{handleSelectUser(tmp.id)}}/>
      })
    }
    const handleSelectUser = (id:number)=>{
      dispatch(setRoomSelect(id))
      setOpenList(false)
    }
    const getChatScreen = ()=>{
      const room = rooms.find(f=>f.id === roomSelect);
      console.log(room);
      
      if(room){
        return <ChatScreen updateMessage={handleAddMessToRoom} room={room} connection={connection}/>
      }

    }
    const handleOpenListUser = ()=>{
      setOpenList(!openList)
    }
    return (

        <div className='main_message ' >
            <div className='open-list-user' onClick={handleOpenListUser} >
            <CiMenuFries />
            </div>

            <div className={'list-user mobile' + (openList? "": " hide_mobile") }>
            {initListUser()}
            </div>
            
            <div className='chat-user' onClick={()=>setOpenList(false)} style={{backgroundColor:'white', position:'relative'}} >
              {getChatScreen()}
            </div>
        </div>
    );
}


const ChatScreen = ({room, connection,updateMessage}:{room:Room, connection: HubConnection | null, updateMessage:(data:Message[], location: number)=>void})=>{
  const {data: messageGet} = useGetMessageByRoomQuery({id:room.id, page:1})
  const [createMessage, createMessageResult ] = useCreateMessageMutation();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState<number>(1);
  const myId =  useSelector((state:RootState)=>state.auth.user?.id)
  const par = room?.participants.filter(tmp=>tmp.userId !== myId)[0];
  const user = par?.user;
  
  const newMessage = async (data:TypeInput) => {
    if(!data.content && data.files.length === 0){
      return;
    }
    if(connection && room.id){
      const result = await createMessage({
        room:room.id,
        message: data.content ,
        medias: data.files
      }).unwrap()
      if(result){
        connection.send("Send",room.id, result.id).then(x => console.log("sent"))

      }

    }
  }
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(()=>{
    setPage(messageGet?.pageIndex ?? page)
    updateMessage(messageGet?.data ?? [], -1)
  },[messageGet])

  

  useEffect(()=>{
    scrollToBottom()
  },[room])

  const initMessages = ()=>{
    const data = room.messages ?? []
    return data.map(tmp=>{
      const itMe = myId === tmp.userId ? true : false;
      if(tmp.mediaMessages.length !== 0)
      return <ItemMessage message={tmp} itMe={itMe} />
    })

  }
  return (
   <>
    {
      room ?
    <div className='mx-3 chat_message' style={{ overflow: 'auto', paddingTop:'75px'}} ref={chatContainerRef}>
        <div className='item_friend' style={{position:'absolute', top:0, left:0, right:0, padding:'10px', background:'white', borderBottom:'1px solid lightgray'}}>
          <img width={50} height={50} style={{borderRadius:'50%'}} src={user?.avatar ?? "https://www.phanmemninja.com/wp-content/uploads/2023/06/avatar-facebook-dep-2.jpeg"}/>
          <div className='info_friend_right' style={{alignItems:'center',display:'flex'}}>
              <p style={{color:'#4399FF', fontWeight:600, fontSize:19}}>{user?.fullName}</p>
              {/* <p>Làm gì só ?</p> */}
          </div>
          <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>

          </div>
          <hr />

        </div>
      
        <div className="content">
          <div className='list-message'>
            {initMessages()}
          </div>
          <div className="input-mess">
            <Input handleSummit={newMessage}/>
          </div>
          
        </div>
        

      </div>
      
      :
      <div>Chat </div>

    }
    </>
  )
}

const ItemMessage = ({message, itMe}:{message:Message, itMe: boolean})=>{
  const text = message.mediaMessages.find(tmp=>tmp.type === "TEXT")
  const media = message.mediaMessages.filter(tmp=>tmp.type !== "TEXT");

  return (
      <div className={itMe ? 'main-item-mess' : 'main-item-mess not-me'} >
        
        <div className={itMe ? 'ml-1' : 'mr-1'} style={{display:'flex', flexDirection:'column-reverse'}}>
        <img style={{borderRadius:'50%'}} width={40} height={40} src={message.user.avatar ?? "https://www.phanmemninja.com/wp-content/uploads/2023/06/avatar-facebook-dep-2.jpeg"} alt="" />
        </div>
        <div className={itMe ? 'item-mess' : 'item-mess-not-me'}>
          {media.length !== 0 && <Line medias={media} event={()=>{}}/>}
          <p>{text?.src}</p>
          <small>{converDate(message.createdDate)}</small>
        </div>
      </div>
    )
    
}
export default Messages;


