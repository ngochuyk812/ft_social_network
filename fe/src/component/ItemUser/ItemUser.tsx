import React from 'react';
import './style.css'
import { User } from '../../types/user.type';
import { useNavigate } from 'react-router-dom';
import { ImProfile } from 'react-icons/im';


function ItemUser({user} : {user:User}) {
    const navigation = useNavigate()
    const handleViewProfile = ()=>{
            navigation("/profile/" + user.id)
    }
    return (
       <div className='item_friend' onClick={handleViewProfile}>
        <img width={50} height={50} src={user.avatar ?? "https://www.phanmemninja.com/wp-content/uploads/2023/06/avatar-facebook-dep-2.jpeg"}/>
        <div className='info_friend_right'>
            <p>{user.fullName}</p>
            <p>{user.username}</p>

        </div>
        <div>
            <button type="button"  className="ml-1 text-white bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                <ImProfile size={20}/>
                
                View Profile
            </button>

        </div>
       </div>
    );
}

export default ItemUser;