import { DetailPost, Post } from "../../types/post.type";
import Line from "../LayoutMedia/Line";
import SkeletonPost from "../SkeletonPost/SkeletonPost";
import './style.css'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { useGetTypeLikesQuery } from "../../redux/services/like.service";
import { setLikeType } from "../../redux/slice/likeTypeSlice";
import HeaderInfoUser from "../HeaderInfoUser/HeaderInfoUser";
import FooterPost from "../FooterPost/FooterPost";
import MenuAction from "../MenuAction/MenuAction";
import { useRemovePostByIdMutation } from "../../redux/services/post.service";
import { addNotify } from "../../redux/slice/notifySlice";
import { removePost } from "../../redux/slice/postSlice";

export default function PostItem ({post, handleShowModal}:{post:Post, handleShowModal: any}){

    const dispatch = useDispatch();
    const likeTypes = useSelector((state: RootState)=>state.likeType.data)
    const itMe =  useSelector((state: RootState)=>state.auth.user?.id)
    const [deletePostApi, deletePostApiRS] = useRemovePostByIdMutation()
    const {data} = useGetTypeLikesQuery();
    
    const handleDeletePost = async ()=>{
        console.log("Xóa bài viết", post.id);
        await deletePostApi({id:post.id}).unwrap();
        dispatch(removePost(post.id))
        dispatch(addNotify({message:" ", description: "Post deleted", type:'error'}))
    }
    useEffect(()=>{
        dispatch(setLikeType(data))
    },[data])

    const handleDetailPost =(index:number)=>{
        const detailPost: DetailPost = {idPost: post.id, active: index}
        handleShowModal(detailPost)
    }

    if(!post)
    return <SkeletonPost/>
    
    return (
        <div role="status" className=" p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 mb-3" >
            <HeaderInfoUser user={post.user} createdDate={post.createdDate}>
                {itMe === post.user.id &&
                <MenuAction>
                    <li onClick={handleDeletePost}>Delete Post</li>
                </MenuAction>
                }
                
            </HeaderInfoUser>
                
            <div className="mb-2">
            {post.caption}
            </div>
            <Line medias={post.mediaPosts} event={handleDetailPost}/>
            <hr />
            <FooterPost post={post} handleDetailPost={handleDetailPost}/>
            <hr />
        
        </div>
    )
}