import React, { useState } from 'react';
import './style.css'
import { MediaType } from '../../types/mediaType.type';
// import { useNavigate } from 'react-router-dom';
function Line({medias, event} :{medias : MediaType[], event:any}) {
    // let navigator = useNavigate()
  
    return (
        <div className='media_content_row mb-2'>
        {medias.map((tmp,index)=>{
                if(index ===3){
                    if(tmp.type.includes('video'))
                        return <div  onClick={()=>event(index)} className='item_media num' style={{backgroundImage:`url(${"tmp.poster"})`, backgroundSize:'cover'}} key={index}><div className='video' ><i className="fa-solid fa-play"></i></div></div>
                    else
                        return <div  onClick={()=>event(index)} className='item_media num' style={{backgroundImage:`url(${tmp.src})`}} key={index}><div className='num_hidden'><p>+{medias.slice(2,medias.length).length - 3}</p></div></div>
                }else{
                    if(index < 3){
                        if(tmp.type.includes('video'))
                            return <div onClick={()=>event(index)} className='item_media span2' style={{backgroundImage:`url(${"tmp.poster"})`, backgroundSize:'cover'}} key={index}><div className='video' ><i className="fa-solid fa-play"></i></div></div>
                        else
                            return <div onClick={()=>event(index)} className='item_media span2' style={{backgroundImage:`url(${tmp.src})`}} key={index}></div>
                    }
                }
        })}
        </div>
    );
}

export default Line;