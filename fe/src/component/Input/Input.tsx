import React, { useEffect, useRef, useState } from 'react';
import './style.css'
import { GoFileMedia } from "react-icons/go";
import { AiOutlineSend } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";

import emoji from './emoji';
import { Input } from '../../types/Index';

function Input({handleSummit} : {handleSummit:any}) {
    const initState : Input = {
        content :"",
        files:[],
    }

    const [showEmoji, setShowEmoji] = useState(false);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const inputFile = useRef<HTMLInputElement>(null);

    const [data, setValue] = useState(initState)
    const [preview, setPreview] = useState<{src:string, type: string}[] >([])

    const submit = ()=>{
        handleSummit(data)
        setValue(initState);

    }
    const handleAddEmoji = (emoji: string)=>{
        setValue(prev=>{
            return {...prev, content: prev.content + emoji}
        })
    }
    
    const changeInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files
        setValue(prev=>{
            if(files){
                prev = {...prev, files :[...files]}
            }
            return prev
        })
    }
    const handlePreview = ()=>{
        const files = data.files
        const preivewList = []
        if(files)
        for (let index = 0; index < files.length; index++) {
            const objectUrl = URL.createObjectURL(files[index])
            preivewList.push({src:objectUrl, type: files[index].type})            
        }
        setPreview(preivewList)
    }
    const removeMeta = (index : number)=>{
        setValue(prev=>{
            const newFiles = data.files.filter((tmp,i)=>i !== index)
            prev = {...prev, files :[...newFiles]}
            return prev
        })
    }
    useEffect(()=>{
        handlePreview()
    },[data.files])
    useEffect(() => {
        function handleClickOutside(event:MouseEvent) {
            if(wrapperRef.current ){
                if(!wrapperRef.current.contains(event.target) ){
                    setShowEmoji(false)
                  }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
          setValue(initState);
        };
      }, []);

    return (
       <div className='input'>
            {   (preview && preview.length > 0) &&
                <div className='preview-meta-input'>
                {preview.map((tmp, index)=>{
                    if(tmp.type.includes("image")){
                        return <div key={tmp.src} className='meta-input'
                        >
                            <CiCircleRemove className="remove-meta-input" onClick={()=>removeMeta(index)}/>
                            <img width={150} height={150} src={tmp.src}  alt="" />
                        </div>
                    }
                    return <div key={tmp.src} className='meta-input'>
                            <CiCircleRemove className="remove-meta-input" onClick={()=>removeMeta(index)}/>
                        <video width={150} height={150} src={tmp.src} />
                    </div>

                })}
            </div>
            }
            <div>
            <input type='file' multiple hidden ref={inputFile}  accept="image/*,video/*" onChange={(e)=>changeInput(e)}/>
            <div>
                <textarea placeholder='Content...' value={data.content} onChange={(e)=>setValue(prev=>{return {...prev, content: e.target.value}})}/>
            </div>
            </div>
            <div className='action-input'>
            <div className='icon-action'>
                <div onClick={()=>{inputFile.current?.click()}}>
                <GoFileMedia className = "icon-input"/>
                </div>
                <div className='emoji' ref={wrapperRef} onClick={()=>setShowEmoji(true)}>
                <MdEmojiEmotions className = "icon-input"/>
                {showEmoji &&
                <div className='list_emoji'>
                    {emoji.map(tmp=>{
                        return <p key={tmp} onClick={()=>handleAddEmoji(tmp)}>{tmp}</p>
                    })}
                </div>}
                </div>
            </div>
            <AiOutlineSend className = "icon-input" onClick={()=>submit()}/>
            </div>
       </div>
    );
}

export default Input;