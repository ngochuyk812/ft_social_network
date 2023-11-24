import { DetailPost, PaginationPost, Post } from "../../types/post.type"
import PostDetail from "../PostDetail/PostDetail"
import PostItem from "./PostItem"
import {useState, useEffect} from 'react'
export default function ListPost({data} :{ data?: PaginationPost}){
    const [select, setSelect] = useState<DetailPost | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleShowModal = (item : DetailPost)=>{
        setSelect(item)
        setIsModalOpen(true)
    }
    
    return (
        <div onScroll={(e)=>{
            console.log(e);
        }}>
            {select && <PostDetail detailPost={select} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>}
            {data?.data?.map((tmp : Post )=>{
                return <PostItem handleShowModal={handleShowModal} post={tmp} key={tmp.id}/>
            })}
        </div>
    )
}