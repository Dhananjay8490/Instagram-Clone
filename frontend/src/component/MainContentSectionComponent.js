import { useContext, useEffect, useState } from "react";
// import { StoryData } from "../Tempfiles/tempdate";
import PostComponent from "./PostComponent"
import RightSectionComponent from "./RightSectionComponent"
import StoryRendererComponent from "./StoryRendererComponent"
import Slider from "react-slick";
import { getPosts, getStories } from "../utils/api";
import { VariablesContext } from "../context/VariablesContext";
// import { MongoClient, MongoClient } from 'mongodb'



export default function MainContentSectionComponent(){

    // const MongoClient = new MongoClient(process.env.REACT_APP_MONGODB_URI);
    const {showNotificationMsgBadge, messageContent} = useContext(VariablesContext)
    const [stories, setStories] = useState([])
    const [post, setPost] = useState([])
    
    const settings = {
                slidesToShow: stories?.length< 5 ? stories.length :5,
                slidesToScroll: stories?.length< 5 ? stories.length :5,
                infinite: stories?.length >5
     };
    
    useEffect(()=>{
        getStories().then(res =>{
            setStories(res.data)
        }).catch(err=>{
            console.log(err)
        })     
    },[])    

    useEffect(()=>{
        getPosts().then(res =>{
            setPost(res.data)
        }).catch(err=>{
            console.log(err)
        })     
    },[])  

    return(
        <div className="flex w-[100%]  h-[100vh] ">
            <div className="flex flex-col px-40 w-[90%]"> 
                <div className="flex justify-center w-[100%]">
                    <div className="w-[350px] ">
                        <Slider {...settings}>
                            {stories.map(item=>{
                                return(
                                <StoryRendererComponent 
                                profileSrc={item?.userInfo?.profilePic}  
                                username={item?.userInfo?.username}
                                stories= {item?.stories}
                                />
                                )
                            })
                            }
                        </Slider>
                    </div>
                    
                </div>
                <div className="flex flex-col justify-center items-center w-[100%]">
                    { post.map(post=>{
                        return(
                            <PostComponent id={post.id} username={post.user.username} isLiked={post.isLiked} isVerified={post.user.isVerified} totalLikes={post.likeCounts} profileSrc={post.user.profilePic} caption={post.caption} totalComentsCount={post.commentsCounts}  images={post.images} isSaved={post.isSaved}/>

                        )
                    })}
                </div>
            </div>
            <RightSectionComponent/>
                    {showNotificationMsgBadge &&
                // chat banner modal for notification which shows msg
                <div className="fixed bottom-[100px] right-4 bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer">
                    <p>{messageContent?.username}</p>
                    <p className="text-white">{messageContent?.msg}</p>
                </div>
            }
            
             
        </div>
    )
}