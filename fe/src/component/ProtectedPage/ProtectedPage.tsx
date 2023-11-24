import { useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { redirect } from 'react-router-dom';
import Login from "../../pages/Login/Login";

export const ProtectedPage = ({page, layout}:{page:any, layout?:any})=>{
    const auth = useSelector((state:RootState)=>state.auth.user);
    
    if(!auth){
        return <Login/>
    }else{
        const Page = page;
        const Layout = layout;
        if(layout){
            return <Layout><Page/></Layout>
        }
        return <Page/>
    }
    

}