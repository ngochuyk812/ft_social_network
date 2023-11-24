import { Dispatch, SetStateAction } from 'react';
import { Comment } from '../../types/post.type';
import HeaderInfoUser from '../HeaderInfoUser/HeaderInfoUser';
import Default from '../LayoutMedia/Default';
import ListComment from './ListComment';
import './style.css'
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import MenuAction from '../MenuAction/MenuAction';
import { useDeleteCommentMutation } from '../../redux/services/comment.service';
import { removeCommentById } from '../../redux/slice/postSlice';
import { addNotify } from '../../redux/slice/notifySlice';


function ItemComment({comment, reply, idPost}:{comment:Comment, reply?:Dispatch<SetStateAction<Comment | undefined>>, idPost:number}) {
    const comments =useSelector((state:RootState)=> state.post.data?.data?.find(tmp=>tmp.id === idPost)?.comments)
    const itMe = useSelector((state:RootState)=>state.auth.user?.id)
    const dispatch = useDispatch()
    const [deleteComment, deleteCommentRS] = useDeleteCommentMutation()
    const children = comments?.data.filter(tmp=>tmp.parentId === comment.id) ?? [];
    const handleDeleteComment = async ()=>{
        const res = await deleteComment({id:comment.id}).unwrap()
        await deleteComment({id:comment.id}).unwrap()
        dispatch(removeCommentById({id:idPost, idComment: comment.id}))
        dispatch(addNotify({message:" ", description: "Comment deleted", type:'error'}))
    }

    return (
        <div className='item-comment'>
            <HeaderInfoUser user={comment.user} createdDate={comment.createAt}>
                {itMe === comment.user.id &&
                <MenuAction>
                    <li onClick={handleDeleteComment}>Delete Comment</li>
                </MenuAction>
                
                }
                <p>{comment.content}</p>
                <Default medias={comment.medias} event={()=>{}}/>
                <p className='reply' onClick={()=>{
                    if(reply)
                    reply(comment)
                }}>
                    Reply
                </p>
                {children && <ListComment comments={children} reply={reply} idParent={comment.id} idPost={idPost}/> }
            </HeaderInfoUser>
        </div>
    );
}

export default ItemComment;

