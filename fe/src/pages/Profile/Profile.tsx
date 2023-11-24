

import { AiOutlineUserAdd, AiOutlineMessage } from "react-icons/ai";
import { RiUserUnfollowFill } from "react-icons/ri";

import './style.css'
import { useState, useEffect, ChangeEventHandler, ChangeEvent, useRef, DetailedHTMLProps, InputHTMLAttributes } from "react";
import ListPost from "../../component/ListPost/ListPost";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useGetMediaUserQuery, useGetPostByPageAndUserQuery, useGetProfileByIdQuery, useUpdateProfileMutation } from "../../redux/services/profile.service";
import { cleanPost, setData } from "../../redux/slice/postSlice";
import { Friend, UpdateProfile, User } from "../../types/user.type";
import NotFound from "../NotFound/NotFound";
import { useAcceptFriendMutation, useAddFriendMutation, useRejectFriendMutation } from "../../redux/services/friend.service";
import { useGetRoomOrCreateQuery } from "../../redux/services/message.service";
import { useGetPostLikedQuery } from "../../redux/services/post.service";
import { Button, Image, Input, Modal, Upload } from "antd";
function Profile() {
    const [profile, setProfile] = useState<User>();
   const[activeTab, setActiveTab] = useState(0)
   const dispatch = useDispatch();
   const [previewOpen, setPreviewOpen] = useState(false);
   const [previewBanner, setPreviewBanner] = useState(false)
   const [previewImage, setPreviewImage] = useState("");
   const user = useSelector((state:RootState)=>state.auth?.user?.id)
    const [addFriend, addFriendRs] = useAddFriendMutation()
    const [rejectFriend, rejectFriendRs] = useRejectFriendMutation()
    const [acceptFriend, acceptFriendRs] = useAcceptFriendMutation()


   const changeTab = (index:number)=>{
    setActiveTab(index)
   }
   let { id } = useParams();
   let itMe = false;
   if(!id || Number(id)== user){
    id = user + "" ?? "-1";
    itMe = true;
   }
   const { data: getRoom, refetch } = useGetRoomOrCreateQuery({user:Number(id)});
   
   const {data:profileRs} = useGetProfileByIdQuery(Number(id));

   const handleAddFriend = async ()=>{
        if(itMe) return;
        const rs = await addFriend(Number(id)).unwrap();
        if(rs && profile){
            setProfile({...profile,  friend: rs})
        }
        
   }
   const handleRejectFriend = async ()=>{
        const rs = await rejectFriend(Number(id)).unwrap();
        if(rs && profile){
            setProfile({...profile,  friend: undefined})
        }
   }
   const handleAccept = async ()=>{
        const rs = await acceptFriend(Number(id)).unwrap();
        if(rs && profile && profile.friend){
            const friendNew: Friend = {...profile.friend, status: 1};
            setProfile({...profile,  friend: friendNew})
        }
   }
   const navigation = useNavigate()
   const message = async ()=>{
    await refetch();
    console.log(getRoom);
    if(getRoom?.id)
    navigation("/messages/" + getRoom.id)
   }
    useEffect(()=>{
       return ()=>{
        dispatch(cleanPost())
       }
    },[id])
    useEffect(()=>{
        if(profileRs)
        setProfile(profileRs)
    },[profileRs])

    const initAction = ()=>{
        if(itMe){
           return; 
        }

        if(!profile?.friend){
            return <div>
                    <button type="button" onClick={handleAddFriend} className="text-white bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                        <AiOutlineUserAdd size={20}/>
                        Add Friend
                    </button>
                    </div>
        }


        if(profile?.friend.status === 0){
            if(profile?.friend.userAcceptId === user && !itMe){
                return <div>
                <button type="button" onClick={handleRejectFriend} className="mr-1 text-white bg-[red] hover:bg-[red]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                    <RiUserUnfollowFill size={20}/>
                    Cancel Request
                </button>
                <button type="button" onClick={handleAccept} className="ml-1 text-white bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                    <AiOutlineUserAdd size={20}/>
                    Accept Request
                </button>
                </div>
            }else{
                return <div>
                <button type="button" onClick={handleRejectFriend} className="mr-1 text-white bg-[red] hover:bg-[red]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                    <RiUserUnfollowFill size={20}/>
                    Cancel Request
                </button>
                </div>
            }
            
        }
        if(profile?.friend.status === 1){
            return <div>
                        <button type="button" onClick={handleRejectFriend} className="mr-1 text-white bg-[red] hover:bg-[red]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                            <RiUserUnfollowFill size={20}/>
                            Cancel Friend
                        </button>
                        <button type="button" onClick={message} className="ml-1 text-white bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55  mb-2">
                            <AiOutlineMessage size={20}/>
                            Message
                        </button>
                    </div>
        }

    }
    const handleCancel = ()=>{
        setPreviewImage("")
        setPreviewOpen(false)
    }
    const handleOpen = (src : string)=>{
        setPreviewImage(src)
        setPreviewOpen(true)
    }


    
    return (
        <>
        {
        !profile ?
        <NotFound/>
        :
        <div className="profile_container main_container" >
            <Image
                width={200}
                style={{ display: 'none' }}
                src={ (profile.banner ?? "https://inkythuatso.com/uploads/images/2022/04/hinh-nen-anime-ve-phong-canh-cuc-dep-07-22-51-01.jpg")+ "?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"}
                preview={{
                visible : previewBanner,
                scaleStep : 0.5,
                src: profile.banner ?? "https://inkythuatso.com/uploads/images/2022/04/hinh-nen-anime-ve-phong-canh-cuc-dep-07-22-51-01.jpg",
                onVisibleChange: (value) => {
                    setPreviewBanner(value);
                },
                }}
            />
            <div className='banner_profile' onClick={()=>setPreviewBanner(true)} style={{cursor:'pointer',backgroundImage:`url(${profile.banner ?? "https://inkythuatso.com/uploads/images/2022/04/hinh-nen-anime-ve-phong-canh-cuc-dep-07-22-51-01.jpg"})`}}></div>
            <div style={{transform : "translateY(-60px)"}}>
                <div className='top_profile'>
                    <div className='top_profile'>
                        <img onClick={()=>handleOpen(profile.avatar ?? 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg')} className='avatar_profile' width={160} height={160} src={profile.avatar ?? 'https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg'}/>
                        <p className='fullname_profile'>{profile.fullName}</p>
                        <p>@{profile.username}</p>
                        <p className='profile_summary'>{profile.story}</p>     

                    </div>
                    {initAction()}
                </div>  
                
                <br />
                
                <div className="center-profile container">
                <ul className="flex py-2 justify-center w-full flex-wrap nav-bar font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mr-2">
                        <button onClick={()=>changeTab(0)} className={"inline-block p-4" + (activeTab === 0 ? " text-blue-600 bg-gray-100 rounded-t-lg" : "")}>Post</button>
                    </li>
                    <li className="mr-2">
                        <button onClick={()=>changeTab(1)} className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 " + (activeTab === 1 ? " text-blue-600 bg-gray-100 rounded-t-lg" : "")}>Media</button>
                    </li>
                    {itMe &&
                    <li className="mr-2">
                        <button onClick={()=>changeTab(2)} className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 " + (activeTab === 2 ? " text-blue-600 bg-gray-100 rounded-t-lg" : "")}>Liked</button>
                    </li>
                    }
                    <li className="mr-2">
                        <button onClick={()=>changeTab(3)} className={"inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 " + (activeTab === 3 ? " text-blue-600 bg-gray-100 rounded-t-lg" : "")}>Profile</button>
                    </li>
                   
                  
                </ul>

                <div className="content-tabs w-full">
                    {activeTab === 0 && <PostTab id={id} />}
                    {activeTab === 1 && <MediaTab id={id} preview= {handleOpen}/>}
                    {activeTab === 2 && <LikedTab />}
                    {activeTab === 3 && <ProfileTab setProfile={setProfile} infoMe={profile}/>}

                </div>
                    
                </div>
            
                 
            </div>    
            
        </div>
        }
        <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
            <img alt="example" style={{ width: '200%' }} src={previewImage} />
        </Modal>
        </>
    );
}


const PostTab = ({id}:{id:string}) =>{
    const[page, setPage] = useState(1)
    const dispatch = useDispatch();
    const dataPost = useSelector((state: RootState)=> state.post.data)
    const { data, isLoading, isFetching } = useGetPostByPageAndUserQuery({index:page, idUser:Number(id)});
    
   useEffect(()=>{
    if(data)
    dispatch(setData(data))
    },[data])
    useEffect(()=>{
        return ()=>{
         dispatch(cleanPost())
        }
     },[])
    return (
        <>
        {dataPost && <ListPost data={dataPost}/>}
        </>
    )
}

const MediaTab = ({id, preview}:{id:string, preview:any}) =>{
    const {data, isLoading, isFetching} = useGetMediaUserQuery({idUser:Number(id)})
    return (
        <div className="media-list">
            {data?.map(tmp=>{
                return <Image
                key={tmp.src}
                width={280}
                height={300}
                src={`${tmp.src}`}
                placeholder={
                  <Image
                    preview={false}
                    src={`${tmp.src}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                    width={200}
                  />
                }
              />
            })}

        </div>
    )
}

const LikedTab = () =>{
    const {data: dataLiked } = useGetPostLikedQuery();
    const dispatch = useDispatch()
    const dataPost = useSelector((state: RootState)=> state.post.data)

    useEffect(() => {
     
      const data = {
        pageIndex: 0,
        pageSize: 0,
        totalPage: 0,
        count: 0,
        hasPreviousPage: false,
        hasNextPage: false,
        data:dataLiked
      }
      dispatch(setData(data))

    }, [dataLiked])

    useEffect(()=>{
      return ()=>{
        dispatch(cleanPost())

      }
    },[])
    
    return (
        <div className="home_container main_container d-flex justify-center px-1">
            <div className="container">
                <p className="title-search">Danh sách bài viết đã thích</p>
                <ListPost data={dataPost}/>
            </div>
        </div>
    );
}
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { PlusOutlined } from '@ant-design/icons';
import { AiOutlineUpload } from "react-icons/ai";
import { addNotify } from "../../redux/slice/notifySlice";
import { updateProfile } from "../../redux/slice/authSlice";
import { SiStoryblok } from "react-icons/si";
import { CiBookmarkRemove } from "react-icons/ci";

const ProfileTab = ({setProfile, infoMe}:{setProfile:React.Dispatch<React.SetStateAction<User|undefined>>, infoMe:User|undefined}) =>{

    const [update, updateResult ] = useUpdateProfileMutation();

    const initInput = {
        fullName: infoMe?.fullName ?? "",
        passwordNew: "",
        rePasswordNew: "",
        avatar: null,
        banner: null,
        story:infoMe?.story ?? "",
        path_avatar: "",
        path_banner:""
    }
    const dispatch = useDispatch();
    const [input, setInput] = useState(initInput);

    const  handleUpdate = async ()=>{
        if(input.passwordNew !== input.rePasswordNew){
            dispatch(addNotify({message:"Cập nhập thông tin", description: "Mật khẩu không khớp vui lòng nhập lại", type:'error'}))
            return
        }
        if(input.fullName.trim() === ""){
            dispatch(addNotify({message:"Cập nhập thông tin", description: "Tên người dùng không được để trống", type:'error'}))
            return
        }
        const result = await update({
            banner: input.banner,
            avatar: input.avatar,
            fullName: input.fullName,
            passwordNew: input.passwordNew,
            story: input?.story ?? ""
        }).unwrap()
        dispatch(addNotify({message:"Cập nhập thông tin", description: "Đã cập nhập thành công", type:'success'}))
        dispatch(updateProfile(result))  
        setProfile(pre=>{
            if(pre)
            return {...pre, fullName: result?.fullName ?? "", avatar: result.avatar, banner: result.banner, story: result?.story ?? ""}
            else
            return pre;
        })   

        setInput(initInput)
    }
    const changeInput = (e : ChangeEvent<HTMLInputElement>)=>{
        
        setInput(pre=>{
            return {...pre, [e.target.name] : e.target.value}
        })
    }
    const handleImage = (e : ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        if(files !== null && files?.length > 0){
            const url =  URL.createObjectURL(files[0]);
            setInput(pre=>{
                return {...pre, [e.target.name] : files[0], ["path_" + e.target.name] : url}
            })
            console.log(files);
            
        }
    }
    const refAvatar = useRef<HTMLInputElement >(null);
    const refBanner = useRef<HTMLInputElement >(null);
    const removeImageUpdate = (action:string)=>{
        setInput(pre=>{
            return {...pre, [action] : null, ["path_" + action] : ""}
        })
        refAvatar.current!.value = '';
        refBanner.current!.value = '';

    }
    
    return (
        <div className="pb-3">
            <div className="row " style={{maxWidth:'900px', margin:'auto'}}>
                <div className="col-lg-6 pb-2">
                    <p>Infomation</p>
                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:10}}>
                        <div className="item-update-image">
                            <Button  name="avatar" onClick={()=>refAvatar.current?.click()} icon={<PlusOutlined />}>Upload Avatar</Button>
                            {input.path_avatar &&
                            <div className="contain-preview-update">
                                <i className="fa-solid fa-trash" onClick={()=>removeImageUpdate('avatar')}></i>
                                <Image
                                key={input.path_avatar}
                                width={142}
                                src={`${input.path_avatar}`}
                                placeholder={
                                <Image
                                    preview={false}
                                    src={`${input.path_avatar}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                                    width={200}
                                />
                                }
                                />    
                            </div>}
                        </div>
                        <div className="item-update-image">
                            <Button  name="banner" onClick={()=>refBanner.current?.click()} icon={<PlusOutlined />}>Upload Banner</Button>
                            {input.path_banner &&
                            <div className="contain-preview-update">
                            <i className="fa-solid fa-trash" onClick={()=>removeImageUpdate('banner')}></i>
                            <Image
                            key={input.path_banner}
                            width={142}
                            src={`${input.path_banner}`}
                            placeholder={
                            <Image
                                preview={false}
                                src={`${input.path_banner}?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200`}
                                width={200}
                            />
                            }
                            />    
                            </div>}
                        </div>

                        <input ref={refAvatar} hidden type="file" name="avatar" onChange={handleImage}/>
                        <input ref={refBanner} hidden type="file" name="banner" onChange={handleImage}/>

                    </div>
                    <Input placeholder="Fullname" value={input.fullName} name="fullName" onChange={changeInput} prefix={<FaRegUserCircle />} className="mb-2"/>
                    <Input placeholder="Story" value={input.story} name="story" onChange={changeInput} prefix={<SiStoryblok  />}/>

                </div>
                <div className="col-lg-6 pb-2">
                    <p>Security</p>
                    <Input.Password placeholder="Password new" value={input.passwordNew} name="passwordNew" onChange={changeInput} className="mb-2" prefix={<RiLockPasswordFill />}/>
                    <Input.Password
                    prefix={<RiLockPasswordFill />}
                        value={input.rePasswordNew} name="rePasswordNew" onChange={changeInput}
                        placeholder="Re password new"
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </div>
            </div>
            <button onClick={handleUpdate} style={{background:'#1677ff', display:'flex', alignItems:'center', gap:5, color:'white', padding:'4px 10px', borderRadius:'5px', margin:'auto'}}>
                <AiOutlineUpload/> Update
            </button>
            
            
        </div>
    )
}

export default Profile;

