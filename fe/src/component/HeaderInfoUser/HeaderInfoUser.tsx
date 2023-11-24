import { User } from "../../types/user.type";
import MenuAction from "../MenuAction/MenuAction";

export default function HeaderInfoUser ({user, createdDate, children}:{user:User, createdDate: string, children?:string | JSX.Element | JSX.Element[] | any }){
    return (
        <div className="flex mb-2 space-x-3" style={{position:'relative'}}>
            <img className="w-10 h-10 rounded-full" src={user.avatar} alt="" />
            <div style={{width:'100%'}}>
                <div className="name-user"><p>{user?.fullName ?? ""}</p></div>
                <div className=" dark:bg-gray-700"><p className="text-xs">{createdDate}</p></div>
                <div>{children}</div>
            </div>
        </div>
    );
}
