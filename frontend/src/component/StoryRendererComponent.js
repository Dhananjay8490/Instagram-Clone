import { useContext } from "react"
import { VariablesContext } from "../context/VariablesContext"
import { user } from "../Assets/img";


export default function StoryRendererComponent({username, profileSrc, stories}){
    
    const {setShowStory, setclickStoryData} = useContext(VariablesContext)
    return(
        <div onClick={()=>{setShowStory(true); setclickStoryData({stories, profileSrc, username})}} className="mx-2 flex flex-col items-center">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full p-[0.14rem]  h-[55px] w-[55px]">
            {profileSrc?.length > 2 ?
                <img className='p-1 bg-black rounded-full h-[50px] w-[50px] object-cover ' src={process.env.REACT_APP_BASE_URL + profileSrc} alt={username} />
                :
                <img className='p-1 bg-black rounded-full h-[50px] w-[50px] ' src={user} alt="prfile" />
            }
            </div>
            <p className="text-white text-[12px]">{username.length > 16 ? username.slice(0, 16) + '...' : username}</p>
          
        </div>
    )
}