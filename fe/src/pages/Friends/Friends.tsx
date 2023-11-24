import './style.css'
import ItemUser from "../../component/ItemUser/ItemUser";
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import { useGetListFriendQuery } from '../../redux/services/profile.service';
function Friends() {
    const itMe = useSelector((state:RootState)=>state.auth.user?.id) ?? -1 ;
    const {data: dataSearch } = useGetListFriendQuery({ idUser: itMe } );

    return (
        <div className="home_container main_container d-flex justify-center px-1">
            <div className="container_search p-3">
                <p className="title-search">Danh sách bạn bè</p>
                {dataSearch?.map((tmp, index)=>{
                   
                    return <ItemUser key={index} user={tmp.userAcceptId === itMe ? tmp.userRequest : tmp.userAccept}/>

                })}
                
            </div>
        </div>
    );
}

export default Friends;

