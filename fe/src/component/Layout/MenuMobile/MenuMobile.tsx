import React, { useEffect, useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';
const MenuMobile : React.FC = () =>{
    const [active, setActive] = useState("")
    const navigator = useNavigate()
    const handleMenu = ( path: string)=>{
        setActive(path)
        navigator(path);
    }
    console.log(location.pathname);
    
    const menu =[
        {path:"/", name: "Home", icon:"fa-solid fa-house"},
        {path:"/friends", name: "Friends", icon:'fa-solid fa-user-group'},
        {path:"/messages", name: "Messages", icon:'fa-solid fa-message'},
        {path:"/notify", name: "Notification", icon : 'fa-solid fa-bell'},
        {path:"/profile", name: "Profile", icon:'fa-solid fa-user'},


    ]
    useEffect(()=>{
        setActive(location.pathname)
    },[location.pathname])
    return (
       <div className='mobile-menu'>
        <ul>
                {menu.map((tmp,index)=>{
                    return <li key={index} onClick={()=>{handleMenu(tmp.path)}} className={active == tmp.path ? 'active' : "not-active"}><i className={tmp.icon}></i> <p style={{fontSize:'13px'}}>{tmp.name}</p></li>

                })}
              
            </ul>
       </div>
    );
}

export default MenuMobile;