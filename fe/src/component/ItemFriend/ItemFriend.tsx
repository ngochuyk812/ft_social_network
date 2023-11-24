import React from 'react';
import './style.css'


function ItemFriend(props : any) {
    const user = props.item
    return (
       <div className='item_friend'>
        <img width={50} height={50} src={user.img}/>
        <div className='info_friend_right'>
            <p>{user.name}</p>
            <p>{user.status === 1 ? 'Đang hoạt động' : "Đã offline"}</p>

        </div>
        <span style={user.status === 1 ? {backgroundColor:'green'}: {backgroundColor:'red'}}></span>
       </div>
    );
}

export default ItemFriend;