import React, { useEffect, useState, useRef, LegacyRef } from 'react';
import CreatePost from '../../component/CreatePost/CreatePost';
import ListSkeletonPost from '../../component/SkeletonPost/ListSkeletonPost';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ListPost from '../../component/ListPost/ListPost';
import { useGetPostByPageQuery } from '../../redux/services/home.service';
import { cleanPost, setData } from '../../redux/slice/postSlice';

function Home() {
    const [page, setPage] = useState(1)
    const dispatch = useDispatch();
    const dataPost = useSelector((state: RootState) => state.post.data)
    const { data, isLoading, isFetching } = useGetPostByPageQuery(page);
    const handleScroll = (e: any) => {
        const scrollTop = e.currentTarget.scrollTop + 1500
        const height = e.currentTarget.scrollHeight
        if (scrollTop > height && !isFetching && page < (dataPost?.pageSize ?? 0)) {
            setPage(pre => pre + 1)
        }

    }
    useEffect(() => {
        if (data?.count)
            dispatch(setData(data))
    }, [data])
    useEffect(() => {
        return () => {
            dispatch(cleanPost())
        }
    }, [])
    return (
        <div className="home_container main_container" onScroll={handleScroll}>
            <CreatePost />
            <div className='mt-2' >
                {!dataPost && <ListSkeletonPost size={4} />}
                {dataPost && <ListPost data={dataPost} />}
            </div>
        </div>
    );
}

export default Home;

