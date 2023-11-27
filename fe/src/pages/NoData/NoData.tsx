import { Button, Result } from 'antd';
import './style.css'

function NoData({text}:{text:string}) {
    return ( 
        <Result
        status="404"
        title=""
        subTitle={text}/>
    )
}

export default NoData;