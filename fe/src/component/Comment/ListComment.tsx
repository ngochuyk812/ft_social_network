import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './ItemComment'
import ItemComment from './ItemComment'
import { Comment } from '../../types/post.type';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
function ListComment({ reply, idParent, comments, onScroll, idPost}:{  reply?:Dispatch<SetStateAction<Comment | undefined>>, idParent?:number, comments?:Comment[], onScroll?:any, idPost:number}) {
    const commentsState =useSelector((state:RootState)=> state.post.data?.data?.find(tmp=>tmp.id === idPost)?.comments)

    let data = comments;
    
    if(!data){
        data = commentsState?.data ?? [];
    }
    console.log(comments);
    
    return (
        <div onScroll={onScroll} className={idParent ? "line " : "comments "}>
            {data?.map(tmp=>{
            if(tmp.parentId == idParent)
            return <ItemComment reply={reply} key={tmp.id} comment= {tmp} idPost={idPost} />
        })    }
        </div>
    );
}

export default ListComment;