import { useEffect, useState } from 'react'
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

import './style.css'
import { Comment } from '../../types/post.type';
import { MediaType } from '../../types/mediaType.type';

import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Input as InputType } from '../../types/Index';
import { useCreateCommentMutation, useGetPageCommentByIdPostQuery } from '../../redux/services/comment.service';
import { addComments, cleanPost, setPaginationComment, setPostSelect } from '../../redux/slice/postSlice';
import HeaderInfoUser from '../../component/HeaderInfoUser/HeaderInfoUser';
import FooterPost from '../../component/FooterPost/FooterPost';
import ListComment from '../../component/Comment/ListComment';
import { useParams } from 'react-router-dom';
import Input from '../../component/Input/Input';
import { useGetPostByIdQuery } from '../../redux/services/post.service';
function PostDetail() {
    const { q } = useParams();
    const [detailPostId, setDetailPostId] = useState(Number(q) ?? 0)
    const [createComment, createCommentResult] = useCreateCommentMutation();
    const [page, setPage] = useState<number>(1);
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.post?.data?.data?.filter(tmp => tmp.id === detailPostId)[0]) ?? null

    const { data: getPost } = useGetPostByIdQuery({ id: detailPostId })

    const { data, isLoading, isFetching } = useGetPageCommentByIdPostQuery({ idPost: detailPostId, page: page }, { skip: (post?.id ? false : true) })
    const [reply, setReply] = useState<Comment>();
    const handleSubmit = async (input: InputType) => {
        const data = { ...input, idPost: post?.id, reply };
        const result = await createComment({ idPost: post?.id, content: data.content, files: data.files, idParent: reply?.id }).unwrap()
        if (result) {
            setReply(undefined)
            dispatch(addComments({ data: [result], id: detailPostId }))
        }
    }
    const commentsState = useSelector((state: RootState) => state.comment.data)
    const handleScroll = (e: any) => {
        const scrollTop = e.currentTarget.scrollTop + 1000
        const height = e.currentTarget.scrollHeight

        if (scrollTop > height && !isFetching && page < (commentsState?.totalPage ?? 0)) {
            setPage(pre => pre + 1)
        }

    }

    const removeReply = () => {
        setReply(undefined);
    }
    useEffect(() => {
        if (data?.data) {
            dispatch(setPaginationComment({ data, id: detailPostId }))
        }
    }, [data])

    useEffect(() => {
        if (getPost) {
            console.log(getPost);
            dispatch(setPostSelect(getPost))

        }
    }, [getPost])
    useEffect(() => {
        return () => {
            dispatch(cleanPost())
        }
    }, [])
    return (
        (true && post) &&
        <div style={{ maxWidth: 800, background: 'white', padding: 10, margin: 'auto', position: 'relative' }}>
            <div className='home_container main_container'>
                <HeaderInfoUser user={post.user} createdDate={post.createdDate} />
                <div className="mb-2">
                    {post.caption}
                </div>
                {post.mediaPosts.length > 0 && <Carousel medias={post?.mediaPosts} active={0} />}
                <hr />
                <FooterPost post={post} />
                <hr />
                <ListComment reply={setReply} onScroll={handleScroll} idPost={detailPostId} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, left: 0, backgroundColor: 'rgb(233, 233, 233)' }}>
                {reply &&
                    <div className='pt-2'>
                        <span className='ml-3' style={{ fontWeight: 'bold' }}><i className="fa-solid fa-reply"></i> Reply to {reply?.user.fullName}</span>
                        <i style={{ color: "red", cursor: 'pointer' }} onClick={removeReply} className="fa-regular fa-circle-xmark ml-2"></i>
                    </div>}
                <Input handleSummit={handleSubmit} />
            </div>
        </div>
    );


}


const Carousel = ({ medias, active }: { medias?: MediaType[], active: number }) => {
    const [index, setIndex] = useState(active)
    const handlePrev = () => {
        setIndex(rs => {
            if (rs === 0)
                return medias?.length ? medias?.length - 1 : 0
            return --rs
        })

    }
    const handleNext = () => {
        setIndex(rs => {
            if (rs === ((medias?.length ?? 0) - 1))
                return 0
            return ++rs
        })

    }
    return (
        <div className='carousel'>
            <div onClick={handlePrev} className="prev"><GrFormPrevious /></div>
            <div onClick={handleNext} className="next"><GrFormNext /></div>
            <div className='main__carousel'>
                {medias?.map((tmp: MediaType, i: number) => {
                    if (tmp.type.includes("image"))
                        return <div key={tmp.src} style={{ backgroundImage: `url("${tmp.src}")` }} className={i < index ? 'main__carousel-item hide__animation' : 'main__carousel-item show__animation'} ></div>;
                })}
            </div>

        </div>
    )
}

export default PostDetail;
