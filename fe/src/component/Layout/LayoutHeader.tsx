import React from 'react';
import Header from './Header/Header'
import './style.css'


interface PropType {
    Page : React.FC;
}
function LayoutHeader(props : PropType) {
    const Page = props.Page
    return (
       <div>
        <Header></Header>
        <div className='container_layout'>
            <Page />
        </div>
       </div>
    );
}

export default LayoutHeader;