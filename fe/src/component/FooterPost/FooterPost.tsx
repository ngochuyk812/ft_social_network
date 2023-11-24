import React, {useState} from 'react';
import { Post, TypeLike } from '../../types/post.type';
import { AiOutlineComment, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { useCreateLikeMutation, useRemoveLikeMutation } from '../../redux/services/like.service';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addReaction, removeReaction } from '../../redux/slice/postSlice';
import './style.css'

function FooterPost({post, handleDetailPost}:{post:Post, handleDetailPost?: any }) {
    const likeTypes = useSelector((state: RootState)=>state.likeType.data)
    const [createLike, createLikeResult ] = useCreateLikeMutation();
    const [removeLike, removeLikeResult ] = useRemoveLikeMutation();
    const [hoverItem, setHoverItem] = useState<number>(-1)
    const [reactionDisplay, setReactionDisplay] = useState<boolean>(false)
    const dispatch = useDispatch();

    const handleShowReaction = ()=>{
        setReactionDisplay(true)
    }
    const handleAddLike = async (id:number)=>{
        const result = await createLike({idPost: post.id, type: id}).unwrap()
        if(result){
            dispatch(addReaction({id: post.id, type: likeTypes?.filter((tmp:TypeLike)=>tmp.id === id)[0]}))
            handleHideReaction()
        }
        
    }
    
    const handleUnLike = async ()=>{
        if(!post.likeType){
            return;
        }
        const result = await removeLike({idPost: post.id}).unwrap()
        if(result)
        dispatch(removeReaction({id: post.id}))
    }
    
    const handleHideReaction = ()=>{
        setReactionDisplay(false)
    }
    
    return (
        <>
        <div className="flex justify-between">
            <p>{post.likeCount} Reaction</p>
            <p>{post.commentCount} Comment</p>
        </div>
        <hr />
        <div className="item-post__list-action">
        <button type="button" onMouseOut={handleHideReaction} onMouseOver={handleShowReaction} className="flex justify-center items-center gap-2 color text-gray-600	iteme-post__button__action">
            
            {!post.likeType ?
            <><AiOutlineLike size={20}/>
            Reaction</> :
            <div className="flex justify-center items-center gap-2"  onClick={()=>handleUnLike()}>
            <img src={post.likeType.icon} width={20} style={{maxHeight:20}} alt="" /> 
            {post.likeType.name}</div>}
            <div onMouseOver={handleShowReaction} onMouseOut={handleHideReaction} className={"box-list-type-like shadow md:p-6 dark:border-gray-700 " + (reactionDisplay ? "show" : "")} >
                {likeTypes &&
                likeTypes.map((tmp: TypeLike, index: number)=>{
                    return <div  key={tmp.id} onMouseOver={()=>setHoverItem(index)} className='item-reaction'><img onClick={()=>handleAddLike(tmp.id)} src={tmp.icon} className="icon_reaction" alt="" /> </div>
                })}
            </div>
        </button>
        <button type="button" className="flex justify-center items-center gap-2 color text-gray-600	iteme-post__button__action" onClick={()=>handleDetailPost ? handleDetailPost(0) : ""}>
            <AiOutlineComment  size={20}/>
            Comment
        </button>
        <button type="button" className="flex justify-center items-center gap-2 color text-gray-600	iteme-post__button__action">
            <AiOutlineShareAlt  size={20}/>
            Share
        </button>
        </div>
        <hr />
        
        </>
        
    );
}

export default FooterPost;