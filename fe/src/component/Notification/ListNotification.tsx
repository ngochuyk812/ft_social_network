
import './style.css'
import Notification from "./Notification";
import { useSelector } from 'react-redux';
import { NotificationType } from '../../types/Index';
import { RootState } from '../../redux/store';

export default function ListNotification() {
    const notifi: NotificationType[] = useSelector((state:RootState)=> state.notify.list)

    return (
        <div className='list__notification'>
            {notifi.map((tmp:NotificationType)=>{
                return <Notification
                key={tmp.id}
                id={tmp.id}
                type={tmp.type}
                message={tmp.message}
                description={tmp.description}
                />
            })}
      </div>
    )
  }

