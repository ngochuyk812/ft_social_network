import React, { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { logout } from '../../../redux/slice/authSlice';
const SidebarLeft : React.FC = () =>{
    const [active, setActive] = useState("")
    const navigator = useNavigate()
    const handleMenu = ( path: string)=>{
        setActive(path)
        navigator(path);
    }
    const dispatch = useDispatch()
    const infoMe = useSelector((state:RootState)=>state.auth.user)    
    const menu =[
        {path:"/", name: "Home", icon:"fa-solid fa-house"},
        {path:"/profile", name: "Profile", icon:'fa-solid fa-user'},
        {path:"/messages", name: "Messages", icon:'fa-solid fa-message'},
        {path:"/friends", name: "Friends", icon:'fa-solid fa-user-group'},
        {path:"/notify", name: "Notification", icon : 'fa-solid fa-bell'},
   

    ]
    useEffect(()=>{
        setActive(location.pathname)
    },[location.pathname])
    return (
       <aside className='sidebar_left'>
        <div className='top_sidebar_left'>
            <img className='avatar_sidebar_left' width={100} height={100} src={infoMe?.avatar ? infoMe.avatar :'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg'}/>
            <p className='fullname_sidebar_left'>{infoMe?.fullName}</p>
            <p className='email_sidebar_left'>@{infoMe?.email}</p>
            <p className='profile_summary' style={{marginTop:0}}>{infoMe?.story}</p>
            
        </div>
        <div className='center_sidebar_left'>
            <ul>
                {menu.map((tmp,index)=>{
                    return <li key={index} onClick={()=>{handleMenu(tmp.path)}} className={active == tmp.path ? 'active' : ""}><i className={tmp.icon}></i> {tmp.name}</li>

                })}
              
            </ul>
        </div>

        <div className='center_sidebar_left'>
            <ul>
                <li onClick={()=>{
                    dispatch(logout())
                }} ><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</li>
            </ul>
        </div>
       </aside>
    );
}

export default SidebarLeft;