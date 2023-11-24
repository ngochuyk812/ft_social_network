import React, {  useRef, useState } from "react";
import "./style.css";
import { Select } from "antd";
import ReactPlayer from 'react-player';
import { useDispatch } from "react-redux";
import { PostItemCreate } from "../../types/post.type";
import { useCreatePostMutation } from "../../redux/services/post.service";
import { addNotify } from "../../redux/slice/notifySlice";

function CreatePost() {
    
      const audience = [
        { value: 0, label: "Public" },
        { value: 1, label: "Private" },
      ];
      const layout = [
        { value: 0, label: "Default" },
        { value: 1, label: "Grid" },
        { value: 2, label: "One Row" },
      ];    
  const [medias, setMedias] = useState<any[]>([]);
  const dispatch = useDispatch();
  const refImage = useRef(null);
  const refVideo = useRef(null);
  const refContent = useRef(null);
  const [layoutSelect, setLayoutSelect] = useState<number>(layout[0].value)
  const [audienceSelect, setAudienceSelect] = useState<number>(audience[0].value)
  const [createPost, createPostResult ] = useCreatePostMutation();
  const removeMedia = (index : number)=>{
    setMedias(prevData=>{
      const newData = prevData
      newData.splice(index,1);
      return newData;
    })
  }
  const selectMedia = (ref: any) => {
    ref.current.click();
  };
  const handleSelectMedia = (ref: any) => {
    const files = ref.current.files;
    setMedias([...medias, ...files])
    ref.current.value = "";
  };
  const handlePost = async() => {
    const caption = refContent.current.value
    console.log({caption, layout: layoutSelect, audience: audienceSelect, medias});
    const postItem : PostItemCreate ={caption, layout: layoutSelect, audience: audienceSelect, medias}
    dispatch(addNotify({message:"Craete post", description: "Post your is being processed", type:'success'}))
    const result = await createPost(postItem).unwrap()
    if(result){
      dispatch(addNotify({message:"Craete post", description: "Your post has been processed", type:'success'}))
    }
    refContent.current.value = "";
    setMedias([])
  }
  return (
    <div className="post_main">
      <div className="top-post_main">
        <img src="https://robohash.org/voluptasundeipsa.jpg?size=50x50&set=set1" />
        <div style={{ flex: 1 }}>
          <Select style={{ width: 120 }} defaultValue={0} onChange={setAudienceSelect} options={audience} />
          <textarea
            ref={refContent}
            rows={5}
            placeholder="Enter caption ..."
          />
        </div>
      </div>
      <hr />

      <div className="bottom-post_main">
        <span
          onClick={() => {
            selectMedia(refImage);
          }}
        >
          <i className="fa-solid fa-image"></i> Photo{" "}
          <input
            ref={refImage}
            onChange={() => {
              handleSelectMedia(refImage);
            }}
            accept="image/*"
            hidden
            id="select_image"
            type="file"
            multiple
          />
        </span>
        <span
          onClick={() => {
            selectMedia(refVideo);
          }}
        >
          <i className="fa-solid fa-video"></i> Video{" "}
          <input
            ref={refVideo}
            onChange={() => {
              handleSelectMedia(refVideo);
            }}
            accept="video/*"
            hidden
            id="select_video"
            type="file"
            multiple
          />
        </span>
      </div>
      <div className="preview_media_select">
        {medias.length > 0 && (
          <Select style={{ width: 180 }} defaultValue={0} onChange={setLayoutSelect} options={layout} />
        )}
        <Preview medias={medias} removeMedia = {removeMedia}/>
      </div>
      <button className="buttonUpload" onClick={handlePost} >
        Post up
      </button>
    </div>
  );
}

function Preview({ medias, removeMedia }: { medias: any[], removeMedia: any }) {
  return (
    <div className="show-preview">
      {medias.map((tmp : any, index : number) => {
        if(tmp.type.includes("image"))
        return <ImagePrivew item = {tmp} index={index} removeMedia = {removeMedia} />
        else
        return <VideoPrivew item = {tmp} index={index} removeMedia = {removeMedia} />
      })}
    </div>
  );
}

function ImagePrivew({item, index, removeMedia} : {item : File, index: number, removeMedia:any}){
    const [status, setStatus] = useState(true)
    const removeItem = ()=>{
      setStatus(false)
      removeMedia(index)
    }
    return(
        <div
        className={status ? "item-media item-image" : "item-media item-image remove-animation"}
        style={{ backgroundImage: `url(${URL.createObjectURL(item)})` }}
        >
            <div className="remove-item" onClick={removeItem}><i className="fa-solid fa-trash"></i></div>
        </div>
    )    
    
}

function VideoPrivew({item, index, removeMedia} : {item : File, index: number, removeMedia:any}){
  const [status, setStatus] = useState(true)
    const removeItem = ()=>{
      setStatus(false)
      removeMedia(index)
    }
    return(
        <div className={status ? "item-media item-video" : "item-media item-video remove-animation"}
        >
            <ReactPlayer
            url={URL.createObjectURL(item)}
            controls={true}
            />
            <div className="remove-item" onClick={removeItem}><i className="fa-solid fa-trash"></i></div>
        </div>
        
    )  
}

export default CreatePost;
