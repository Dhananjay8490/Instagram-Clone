import { IoHeartOutline} from "react-icons/io5";
import PostProfileComponent from "./PostProfileComponent";
import { LuMessageCircle } from "react-icons/lu";
import { PiPaperPlaneTiltBold } from "react-icons/pi";
import { MdVerified } from "react-icons/md";
import { useContext, useState } from "react";
import { IoHeartSharp } from "react-icons/io5";
import { CgSmile } from "react-icons/cg";
import ModelComponent from "./ModelComponent";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import axios from "axios";
import { updateLike, updateSave } from "../utils/api";
import { VariablesContext } from "../context/VariablesContext";




const SplitHandler = (caption)=> {
    if(caption?.includes('#')){
        const captionArray = caption.split('#')
        return captionArray
    }
    return caption? [caption] : []
}


export default function PostComponent({id, username, caption, totalLikes, isSaved, isLiked, totalComentsCount, profileSrc, isVerified, images}){

    const {sendMessage} = useContext(VariablesContext)
    const [postLiked, setPostLiked] = useState(isLiked)
    const [totalLikesCount, setTotalLikesCount] = useState(totalLikes)
    const [postSaved, setPostSaved] = useState(isSaved)
    const [moreclick, setMoreCLicked] = useState(false)
    const [showShareModel, setShowShareModel] = useState(false)

    const updateLikeHandler = (id, status)=>{
        updateLike(id, status).then(res =>{
            setPostLiked(status)
            setTotalLikesCount(res.data.likeCounts)
            sendMessage({type: "like", payload : {postId: id, likeStatus: status}})
        }).catch(err =>{})
    
    }

    const updateSaveHandler = (postId, status)=>{
        updateSave(postId, status).then(res =>{
            console.log(res)
            setPostSaved(status)
        }).catch(err =>{
            console.log(err)
        })
    }

    return(
        <>
        <div className="flex flex-col justify-between p-10 w-[500px]">
            <PostProfileComponent imgSrc= {process.env.REACT_APP_BASE_URL + profileSrc}
            username= {username}
            isVerified={isVerified}
            createdAt='22h' 
            />
            <img className="my-1 w-[500px] rounded-md object-contain" src={process.env.REACT_APP_BASE_URL + images?.[0]?.['image']} alt='rashmika_mandanna ' />
            <div className="flex my-1 items-center justify-between w-[100%]">
                <div className="flex items-center gap-2">
                    {postLiked ? 
                        <IoHeartSharp onClick={()=> updateLikeHandler(id, false)} size='28' color="red" />
                        : 
                        <IoHeartOutline onClick={()=> updateLikeHandler(id, true)} size='28' color="white" />
                    }
                    <LuMessageCircle size='28' color='white'/>
                    <PiPaperPlaneTiltBold onClick={()=> setShowShareModel(true)} size='26' color='white'/>
                </div>
                {postSaved ?
                    <GoBookmarkFill onClick={()=> updateSaveHandler(id, false)} size='28' color='white'/>
                    :
                    <GoBookmark onClick={()=> updateSaveHandler(id, true)} size='28' color='white'/>
                }
            </div>
            <p className="text-white font-semibold">{totalLikesCount} likes</p>
            <div className="text-white items-center text-[14px] w-[100%]">
                <span className="inline-flex mr-2 items-center font-semibold">{username} {isVerified && <MdVerified color="#0096f6" size='17'/>} </span>
                
                <span>{caption?.length > 50 && !moreclick ? (
                    <>
                        {caption.slice(0,50)} 
                        <span className="text-gray-500 cursor-pointer text-[14px]" onClick={()=> setMoreCLicked(true)}>... more</span>
                    </>
                    ): (
                        <>
                            {SplitHandler(caption).map((text, index) =>{
                                return(
                                    <span className={`${index === 0 ? 'text-white': 'text-sky-500 hover: cursor-pointer'}`}>{(index !== 0 ? '#' : '') + text}</span>
                                )
                            })}
                            {caption &&
                                <span className="text-gray-500 cursor-pointer text-[14px]" onClick={()=> setMoreCLicked(false)}>... less</span>
                            }
                        </>
                    )}</span>
            </div>
                <p className="text-gray-400 text-[12px] cursor-pointer">View All {totalComentsCount} Comments</p>
                <div className="flex items-center my-2 border-b-[0.4px] border-gray-500 pb-4">
                    <input className="bg-transparent outline-none text-[12px] w-[100%] text-gray-300 " placeholder="Add a Comment..." />
                    <CgSmile color="gray"/>
                </div>
                {showShareModel &&
                    <ModelComponent  setShowShareModel={setShowShareModel}/>
                }
             </div> 
        </>
    )
}