import React, {  HTMLInputTypeAttribute, useEffect, useRef} from 'react';
import './style.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { addNotify } from '../../redux/slice/notifySlice';
import { setLogin } from '../../redux/slice/authSlice';
import { useForgotMutation, useLoginMutation, useSignupMutation, useVery_forgotMutation } from '../../redux/services/login.service';
import { Button, Form, Input, Tabs, TabsProps } from 'antd';
import { SignUpType } from '../../types/user.type';
function Login() {
   
    // const auth = useSelector((state: RootState)=>{
    //     return state.auth
    // })
    const onChange = (e:string)=>{
        setActiveKey(e)
    }
    const items: TabsProps['items'] = [
        {
          key: '1',
          label: 'SignIn',
          children: <LoginForm onChange={onChange}/>,
          
        },
        {
          key: '2',
          label: 'SignUp',
          children: <RegisterForm onChange={onChange}/>,
        },
        {
          key: '3',
          label: '',
          children: <ForgetForm onChange={onChange}/>,
        }
      ];
    const [activeKey, setActiveKey] = useState(items[0].key)

    
    
    return (
        <div className='main_login'>
                <div className='form-login'>
                    <img src="/src/assets/logo-white.png" width={300}  alt="" />
                    <Tabs defaultActiveKey="1" activeKey={activeKey} items={items} onChange={onChange} />
                </div>
        </div>

    );
}

export default Login;



const LoginForm = ({onChange}:{onChange:(key:string)=>void})=>{
    const navigator = useNavigate()
    const [login, loginResult ] = useLoginMutation();
    const [username, setUsername] = useState<string>('')
    const [summit, setSummit] = useState<boolean>(false)
    const [pass, setPass] = useState<string>('')
    const dispatch = useDispatch();
    const refRemenber = useRef(null)
    const handleLogin = async (e : React.MouseEvent<HTMLButtonElement>)=>{
        let check = true
        e.preventDefault()
        const arrInput = document.querySelectorAll(".signin-check input")
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
    return(
        <form action="#" className="signin-form signin-check">
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
                            <input type="checkbox" className='ml-2' defaultChecked id='remenberMe' ref={refRemenber} />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="w-50 text-md-right forgot" >
                        <a onClick={()=>onChange('3')} >Forgot Password</a>
                    </div>
                </div>
            </form>
    )
}
const ForgetForm = ({onChange}:{onChange:(key:string)=>void})=>{
    const navigator = useNavigate()
    const [forgotAPI, forgotRS ] = useForgotMutation();
    const [veryForgotAPI, veryForgotRS ] = useVery_forgotMutation();

    const [email, setEmail] = useState<string>('')
    const [pass, setPass] = useState<string>('')
    const [rePass, setRePass] = useState<string>('')
    const [OTP, setOTP] = useState<string>('')

    const [step, setStep] = useState(0);
    const dispatch = useDispatch();

    const handleForgot = async (e : React.MouseEvent<HTMLButtonElement>)=>{
        let check = true
        e.preventDefault()
        const arrInput = document.querySelectorAll(step === 0 ? ".forgot-check input" : ".forgot-check2 input")
        arrInput.forEach((tmp: any)=>{
            if(tmp.value === ''){
                tmp.style.border = '1px solid red'
                check = false
            }else{
                tmp.style.border ='1px solid lightgray'

            }
        })
        if(check){
            if(rePass !== pass){
                dispatch(addNotify({message:"Forgot password failed", description: "Password incorrect", type:'error'}))
                return;
            }
            try{
                if(step === 0){
                    const result = await forgotAPI(email).unwrap()
                    setStep(1);
                }else{
                    await veryForgotAPI({otp: OTP, password: pass}).unwrap();
                    onChange("1")
                    dispatch(addNotify({message:"Success", description: "Change password success", type:'success'}))

                }
                
            }catch(error:any){
                dispatch(addNotify({message:"Forgot password failed", description: error.data.message, type:'error'}))
                return
            }
            
        }
        else
        dispatch(addNotify({message:"Forgot password failed", description: "Please enter enough information", type:'error'}))
    }
    return(
        <>
        {step === 0 &&
            <form action="#" className="signin-form forgot-check">
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Email</label>
                        <input type="email" className="form-control" placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}} required />
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" onClick={(e)=>{handleForgot(e,)}} className="form-control btn btn-primary rounded submit px-3">Forgot Password</button>
                    </div>
                    
            </form>
        }
        {step === 1 &&
            <form action="#" className="signin-form forgot-check2">
                   
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Password</label>
                        <input type="password" className="form-control" placeholder="Password New" onChange={(event)=>{setPass(event.target.value)}} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">Re-Password</label>
                        <input type="password" className="form-control" placeholder="Password New" onChange={(event)=>{setRePass(event.target.value)}} required />
                    </div>
                    <div className="form-group mb-3">
                        <label className="label" htmlFor="name">OTP</label>
                        <input type="text" className="form-control" placeholder="000000" onChange={(event)=>{setOTP(event.target.value)}} required />
                    </div>
                    
                    <div className="form-group">
                        <button type="submit" onClick={(e)=>{handleForgot(e)}} className="form-control btn btn-primary rounded submit px-3">Submit</button>
                        <button type="submit" onClick={(e)=>{setStep(pre=>pre-1)}} style={{backgroundColor:'red'}} className="form-control btn btn-danger rounded submit px-3 mt-2">Back</button>

                    </div>
                    
            </form>
        }
        
        </>
        
    )
}

const RegisterForm = ({onChange}:{onChange:(key:string)=>void})=>{
    const initState:SignUpType = {
        fullName:'',
        password:'',
        re_password:'',
        email:'',
        username:''
    }
    const [signUp, signUpResult ] = useSignupMutation();
    const [formSignUp, setFormSignUp] = useState(initState)

    const dispatch = useDispatch();
    const onChangeInput =(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormSignUp(pre=>{
            return {...pre, [e.target.name]: e.target.value}
        })
    }
 
    const handleSubmit = async (e : React.MouseEvent<HTMLButtonElement>)=>{
        let check = true
        e.preventDefault()
        const arrInput = document.querySelectorAll(".signup-check input")
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
                const result = await signUp(formSignUp).unwrap()
                dispatch(addNotify({message:"Register success", description: "Please check your email and confirm" , type:'success'}))
                onChange("1")
            }catch(error:any){
                dispatch(addNotify({message:"Register failed", description: error.data.data, type:'error'}))
                return
            }
            
        }
        else
        dispatch(addNotify({message:"Register failed", description: "Please enter enough information", type:'error'}))
    }
    return(
        <form action="#" className="signin-form signup-check">
                <div className="form-group mb-3">
                    <label className="label" htmlFor="name">Username</label>
                    <input type="text" name='username' className="form-control" placeholder="Username" onChange={onChangeInput} required />
                    <small></small>
                </div>
                <div className="form-group mb-3">
                    <label className="label" htmlFor="name">Email</label>
                    <input type="email" name='email' className="form-control" placeholder="Email" onChange={onChangeInput} required />
                    <small></small>
                </div>
                <div className="form-group mb-3">
                    <label className="label" htmlFor="name">Full Name</label>
                    <input type="text" name='fullName' className="form-control" placeholder="Full Name" onChange={onChangeInput} required />
                    <small></small>
                </div>
                <div className="form-group mb-3">
                    <label className="label" htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control" placeholder="Password" onChange={onChangeInput} required />
                </div>
                <div className="form-group mb-3">
                    <label className="label" htmlFor="password">Re-Password</label>
                    <input type="password" name='re_password' className="form-control" placeholder="Re-Password" onChange={onChangeInput} required />
                </div>

                <div className="form-group">
                    <button type="submit" onClick={(e)=>{handleSubmit(e)}} className="form-control btn btn-primary rounded submit px-3">Sign Up</button>
                </div>

        </form>
    )
}



{/* <div className='main_login '>

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
</div> */}