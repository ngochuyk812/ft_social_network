import React from 'react';
import Header from './Header/Header'
import './style.css'
import SidebarLeft from './SidebarLeft/SidebarLeft'
import SidebarRight from './SidebarRight/SidebarRight'

interface PropsType {
    children: React.ReactNode;
}
function DefaultLayout(props: PropsType) {
    return (
       <div className="body">
        <Header></Header>
        <SidebarLeft></SidebarLeft>
        <div className='main_layout'>
            {props.children}
        </div>
        <SidebarRight></SidebarRight>
       </div>
    );
}

export default DefaultLayout;