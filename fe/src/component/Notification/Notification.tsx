
import { RxInfoCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import './style.css'
import { NotificationType, StyleNotification } from "../../types/Index";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppThunkDispatch } from "../../types/ReduxType";
import { removeNotify } from "../../redux/slice/notifySlice";


export default function Notification(props: NotificationType) {
    const dispatch = useDispatch<AppThunkDispatch>();
    useEffect(()=>{
        setTimeout(()=>{
            dispatch(removeNotify(props.id))
        },1500)
    },[])
    return (
        <div className={`notification notification__${props.type}`}>
        <div className={`notification__left`}>
            <RxInfoCircled size={25} className={`notification__icon__${props.type}`}/>
            <div className="notification__content">
                <div className={`notification__title notification__title__${props.type}`}>{props.message}</div>
                <div className={`notification__description notification__description__${props.type}`}>{props.description}</div>
            </div>
        </div>
        <RxCross2 className={`notification__icon__${props.type}`}/>
    </div>
    )
  }


