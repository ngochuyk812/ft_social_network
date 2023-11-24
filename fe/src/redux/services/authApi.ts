import axios from "axios";
import { LoginType } from "../../types/user.type";
const baseUrl = import.meta.env.VITE_URL_BE;


export const signInApi =  (data:LoginType)=>{
    return new Promise(  (resolve, reject) =>{
        const config = {
            method: 'post',
            url: baseUrl+'/api/auth/sign_in',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
    
         axios(config).then((rs)=>{
            resolve(rs)
         }).catch(error=> reject(error))
    })
    
} 