import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetNotificationQuery } from "../../redux/services/profile.service";
import { Notification } from '../../types/Index';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import converDate from '../../helper/converDate';
function Notification() {
    const {data: notifications } = useGetNotificationQuery();
    const dispatch = useDispatch()
    return (
        <div className="home_container main_container d-flex justify-center px-1 notifications-main">
            <div className="container">
                <p className="title-search">Notification</p>
                {notifications?.map(tmp=>{
                  return <ItemNotification notification={tmp} />
                })}
                
                
            </div>
        </div>
    );
}

const ItemNotification = ({notification}:{notification:Notification})=>{
  const init = {
    content:"",
    linkTo: ""
  }
  const [obj, setObj] = useState(init)
  useEffect(()=>{
    const value = {...init}
    if(notification.type === 0){
      value.content = " đã thích bài viết của bạn"
      value.linkTo = "/post/" + notification.idObj
    }
    if(notification.type === 1){
      value.content = " đã bình luận bài viết của bạn"
      value.linkTo = "/post/" + notification.idObj

    }
    if(notification.type === 2){
      value.content = " đã gửi lời mời kết bạn đến bạn"
      value.linkTo = "/profile/" + notification.idObj

    }
    if(notification.type === 3){
      value.content = " đã chấp nhận lời mời kết bạn đến bạn"
      value.linkTo = "/profile/"+ notification.idObj

    }
    if(notification.type === 4){
      value.content = " đã trả lời bình luận đến bạn"
      value.linkTo = "/post/" + notification.idObj
    }

    setObj(value)
  },[])
  return (
    <Link to={obj.linkTo}>
    <div className='notification-item'>
      <img width={50} height={50} style={{borderRadius:'50%'}} src={notification.from?.avatar ?? "https://www.phanmemninja.com/wp-content/uploads/2023/06/avatar-facebook-dep-2.jpeg"}/>
      <div>
        <p>
          <strong>{notification.from?.fullName}</strong> 
          {obj.content}
        </p>
        <small style={{color:'#959090'}}>{converDate(notification.createdDate)}</small>
      </div>
      
    </div>
    </Link>
  )
}

export default Notification;

