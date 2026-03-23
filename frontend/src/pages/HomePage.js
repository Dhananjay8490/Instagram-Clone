import { useContext, useEffect, useState} from "react";
import { MainContentSectionComponent } from "../component";
import { GoX } from "react-icons/go";
import { PiPaperPlaneTiltBold, PiPlay } from "react-icons/pi";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { VariablesContext } from "../context/VariablesContext";
import { user } from "../Assets/img";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
// import axios from "axios";



export default function HomePage(){
    const {showStory, clickStoryData, setShowStory} = useContext(VariablesContext)
    const [showNext, setShowNext] = useState(0)
    // const [showPrev, setShowPrev] = useState(clickStoryData?.stories?.length -1)

    const handleNextPrevClick =( isNext) =>{
        if (isNext){
            if(showNext <clickStoryData?.stories?.length -1 ){
                setShowNext(prev => prev + 1)
            }
        }

        if (!isNext){
            if(showNext > 0 ){
                setShowNext(prev => prev - 1)
            }
        }
    }

    useEffect(()=>{
        if(showStory){
            setShowNext(0)
        }
    },[showStory])
    
    return(
        <>
        <div className="flex h-[90vh] overflow-y-scroll w-[100%]">
            <MainContentSectionComponent />
            
            {showStory &&
            <div className="text-white bg-black/95 z-20 absolute w-[100%] h-[100vh] top-0 left-0 ">
                <GoX size={30} color="white" className="absolute right-3 top-3 cursor-pointer" onClick={()=>setShowStory(false)} />
                 <div className="flex justify-center py-6">
                    <div className="flex flex-col items-center relative ">
                        <div className="flex w-[400px] justify-between h-[98vh] rounded-lg p-2 temp" 
                            style={{ backgroundImage:`url('${process.env.REACT_APP_BASE_URL + clickStoryData?.stories[showNext]?.media}')`,
                            aspectRatio: '16/9', 
                            backgroundSize: 'cover', 
                            backgroundPosition:'center center', 
                            backgroundRepeat:'no-repeat' }}>
                        <div className="absolute top-[10px] w-[96%] flex items-center gap-1">
                            {
                                clickStoryData?.stories?.map((item, index) =>{
                                    const isBgWhite = index < showNext
                                    return(
                                        <div className= {`w-[100%] h-[2px]  ${isBgWhite ? 'bg-white/70' : 'bg-white/30'} z-[10]`} />
                                    )
                                })
                            }
                        </div>
                            <div className="flex items-center h-max mt-4 z-20">
                                {clickStoryData?.profileSrc?.length > 2 ?
                                    <img className="w-[30px] h-[30px] rounded-full object-cover mr-2" src={process.env.REACT_APP_BASE_URL + clickStoryData?.profileSrc} alt=""/>
                                    :
                                    <img className='p-1 bg-black rounded-full h-[50px] w-[50px] object-cover ' src={user} alt="profile" />
                                }
                                <p className="text-white z-20 font-semibold mt-2">{clickStoryData?.username }</p>
                            </div> 
                            <div className="flex gap-1 items-center mt-4 h-max z-20">
                                <PiPlay size={23} color="white" className="cursor-pointer" />
                                <HiDotsHorizontal size={23} color="white" className="cursor-pointer" />
                            </div>  
                            <div className="absolute top-[50%] left-[-60px] ">
                                <CgChevronLeft onClick={()=> handleNextPrevClick(false)} color='white' size={20} />
                            </div>
                            <div className="absolute top-[50%] right-[-60px] ">
                                <CgChevronRight onClick={()=> handleNextPrevClick(true)} color='white' size={20} />  
                            </div>
                        </div>   
                    <div className="flex items-center w-[100%] text-white -mt-12 gap-2 pr-2 z-20">
                        <input placeholder={`Reply to ${clickStoryData?.username}`} className="border placeholder:text-white outline-none w-[98%] p-2 mx-2 border-gray-400 bg-transparent rounded-full"/>
                        <IoHeartOutline size={30} color="white" />
                        <PiPaperPlaneTiltBold size={30} color="white" />
                    </div>
                    </div>
                </div> 
            </div>
            }
        </div>
        </>
    )
}