import { Button, Result } from 'antd';
import './style.css'
import { Link, useParams } from 'react-router-dom';
import { useVerificationQuery } from '../../redux/services/login.service';
import NotFound from '../NotFound/NotFound';
import { QueryStatus } from '@reduxjs/toolkit/dist/query';

function Verification() {
    const {token} = useParams()
    const data = useVerificationQuery({token})
    console.log(data);
    
    return ( 
        <>
        {data.data && 
             <Result
            status="success"
            title="Successfully Verification Account!"
            subTitle="Your account has been successfully registered. Please proceed to log in."
            extra={[
            <Link to={'/login'}><Button type="dashed" key="console">
            Go Login
        </Button></Link>,
            ]}
        />}
        {data.error && <NotFound/>}
        </>
    )
}

export default Verification;