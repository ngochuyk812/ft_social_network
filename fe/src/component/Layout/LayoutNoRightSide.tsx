import React from 'react';
import Header from './Header/Header'
import './style.css'
import SidebarLeft from './SidebarLeft/SidebarLeft'
import MenuMobile from './MenuMobile/MenuMobile';

interface PropsType {
    children: React.ReactNode;
}
function LayoutNoRightSide(props: PropsType) {
    return (
       <div className="body_no_right">
        <Header></Header>
        <SidebarLeft></SidebarLeft>
        <div className='main_layout'  >
            {props.children}
        </div>
        <MenuMobile></MenuMobile>
       </div>
    );
}

export default LayoutNoRightSide;