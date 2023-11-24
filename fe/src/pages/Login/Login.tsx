import React, {  useRef} from 'react';
import './style.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addNotify } from '../../redux/slice/notifySlice';
import { setLogin } from '../../redux/slice/authSlice';
import { useLoginMutation } from '../../redux/services/login.service';
function Login() {
    const navigator = useNavigate()
    const [login, loginResult ] = useLoginMutation();
    const [username, setUsername] = useState<string>('')
    const [summit, setSummit] = useState<boolean>(false)
    const [pass, setPass] = useState<string>('')
    const dispatch = useDispatch();
    const refRemenber = useRef(null)
    // const auth = useSelector((state: RootState)=>{
    //     return state.auth
    // })

    const handleLogin = async (e : React.MouseEvent<HTMLButtonElement>)=>{
        let check = true
        e.preventDefault()
        const arrInput = document.querySelectorAll(".signin-form input")
        arrInput.forEach((tmp: any)=>{
            if(tmp.value === ''){
                tmp.style.border = '1px solid red'
                check = false
            }else{
                tmp.style.border ='1px solid lightgray'

            }
        })
        if(check){
            try{
                const result = await login({username, password: pass}).unwrap()
                dispatch(addNotify({message:"Login success", description: "Hello " + result.fullName ?? "", type:'success'}))
                dispatch(setLogin(result))
                navigator("/")
            }catch(error:any){
                
                dispatch(addNotify({message:"Login failed", description: error.data.message, type:'error'}))
                return
            }
            
        }
        else
        dispatch(addNotify({message:"Login failed", description: "Please enter enough information", type:'error'}))
    }
    return (

        <div className='main_login '>

            <div className='login_form '>
                <div className='backgroud'>

                </div>
                <div className='login'>
                    <div className="login-wrap p-4 p-md-5">
                        <div className="">
                            <h3 className="mb-4" style={{textAlign:'center'}}>Sign In</h3>

                        </div>
                        <form action="#" className="signin-form">
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="name">Username</label>
                                <input type="text" className="form-control" placeholder="Username" onChange={(event)=>{setUsername(event.target.value)}} required />
                                <small></small>
                            </div>
                            <div className="form-group mb-3">
                                <label className="label" htmlFor="password">Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={(event)=>{setPass(event.target.value)}} required />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={(e)=>{handleLogin(e)}} className="form-control btn btn-primary rounded submit px-3">Sign In</button>
                            </div>
                            <div className="form-group d-md-flex " style={{margin: '15px 0 ', display:'flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                                <div className="w-50 text-left">
                                    <label className="checkbox-wrap checkbox-primary mb-0" >Remember Me
                                        <input type="checkbox" defaultChecked id='remenberMe' ref={refRemenber} />
                                        <span className="checkmark" />
                                    </label>
                                </div>
                                <div className="w-50 text-md-right forgot" >
                                    <Link to={'/forgotPassword'} >Forgot Password</Link>
                                </div>
                            </div>
                        </form>
                        <p className="text-center">Not a member? <Link to={'/register'} className="active">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Login;