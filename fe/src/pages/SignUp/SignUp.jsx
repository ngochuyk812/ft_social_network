import React, { useEffect } from 'react';
import './style.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { addNotify } from '../../redux/slice/notifySlice';
import { cleanState, signUp } from '../../redux/slice/authSlice';
import { SINGUP_FAILED, SINGUP_SUCCESS } from '../../redux/constans/statusUser';
SignUp.propTypes = {
    
};

function SignUp(props) {
    const navigator = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPass] = useState('')
    const [re_pass, setRePass] = useState('')
    const [fullName, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const statusSignUp = useSelector(state =>{
        return state.auth
    })
    const dispatch = useDispatch()
    const handleSignUp = (e)=>{
        let check = true
        let error = ''
        e.preventDefault()
        
        let arrInput = document.querySelectorAll(".signin-form input")
        arrInput.forEach(tmp=>{
            if(tmp.value === ''){
                tmp.style.border = '1px solid red'
                check = false
            }else{
                tmp.style.border ='1px solid lightgray'

            }
        })
         if(check){
            if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ){
              error+= "- Email invalidate \n"
              check = false
            }
            if(re_pass === password && password.length > 8 ){
                // dispatch(register({username,password, address, email}))
                dispatch(signUp({username,password, fullName, email}))
                return
            }

            else
                if(re_pass !== password)
                error+= "- Password does not match \n"
                else
                error+= "- Password must be longer than 8 characters \n"

         }else{
          error+= "- Please enter full information \n"

         }

        dispatch(addNotify({message:"Registration failed", description: error, type:'error'}))
         
    }
    useEffect(()=>{
      if(statusSignUp.status === SINGUP_FAILED){
        dispatch(addNotify({message:"Registration failed", description: statusSignUp.error, type:'error'}))
        dispatch(cleanState())
        }
        if(statusSignUp.status === SINGUP_SUCCESS){
          dispatch(addNotify({message:"Registration success", description: "", type:'success'}))
          dispatch(cleanState())

          navigator('/login')

          }   
    },[statusSignUp])
    return (
       <div className='main_login '>
        {/* {statusSignUp.status === ""?<h1>Logding</h1>:""} */}
        <div className='login_form '>
            <div className='backgroud'>

            </div>
            <div className='login'>
            <div className="login-wrap p-4 p-md-5">
        <div className="">
        <h3 className="mb-4" style={{textAlign:'center'}}>Sign Up</h3>

        </div>
        <form action="#" className="signin-form">
          <div className="form-group mb-3">
            <label className="label" htmlFor="name">Username</label>
            <input onChange={(e)=>setUsername(e.target.value)} type="text" className="form-control" placeholder="Username" required />
            <small></small>
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="email">Email</label>
            <input  onChange={(e)=>setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="address">FullName</label>
            <input type="text"  onChange={(e)=>setFullname(e.target.value)} className="form-control" placeholder="FullName" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="password">Password</label>
            <input type="password"  onChange={(e)=>setPass(e.target.value)} className="form-control" placeholder="Password" required />
          </div>
          <div className="form-group mb-3">
            <label className="label" htmlFor="password">Re-Password</label>
            <input type="password"  onChange={(e)=>setRePass(e.target.value)} className="form-control" placeholder="Re-Password" required />
          </div>
       
          <div className="form-group">
            <button type="submit" onClick={(e)=>{handleSignUp(e)}} className="form-control btn btn-primary rounded submit px-3">Sign Up</button>
          </div>
          <div className="form-group d-md-flex " style={{margin: '15px 0 '}}>
            
            <div className="text-md-right forgot" >
                <Link to={'/forgotPassword'} href="#">Forgot Password</Link>
            </div>
          </div>
        </form>
        <p className="text-center">Already have an account? <Link to={'/login'} className="active">Sign In</Link></p>
      </div>
            </div>
       </div>
       </div>

    );
}

export default SignUp;