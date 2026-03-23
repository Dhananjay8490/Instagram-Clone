import { CgClose, CgSearch } from "react-icons/cg";
import { StoryData } from "../Tempfiles/tempdate";
import { FaFacebook, FaFacebookMessenger, FaThreads, FaWhatsapp, FaX } from "react-icons/fa6";
import { RiLink } from "react-icons/ri";
import { GoMail } from "react-icons/go";
import { PiArrowBendUpRightBold } from "react-icons/pi";
import Slider from "react-slick";

const IconData = [
  { Icon: RiLink, socialName: 'Copy link' },
  { Icon: FaFacebook, socialName: 'Facebook' },
  { Icon: FaFacebookMessenger, socialName: 'Messenger' },
  { Icon: FaWhatsapp, socialName: 'WhatsApp' },
  { Icon: GoMail, socialName: 'Email' },
  { Icon: FaThreads, socialName: 'Threads' },
  { Icon: FaX, socialName: 'X' },
  { Icon: PiArrowBendUpRightBold, socialName: 'See all' }
];

function RenderUsers({imgUrl, username}){
    return(
        <div className="flex flex-col items-center w-[25%] p-2">
            <img className="h-[50px] w-[50px] object-cover rounded-full" src={imgUrl} alt={username}/>
            <p className="text-[11px] text-white">{username}</p>
        </div>
    )
}

const IconRenderer = ({Icon, socialName})=>{
    return(
        <div className="flex flex-col items-center">
            <div className="p-4 m-2 rounded-full w-max bg-black">
                <Icon color='white' size={20} />
            </div>
            <p className="text-white text-[12px]">{socialName}</p>
        </div>
    )
}
const settings = {
                slidesToShow: 5,
                slidesToScroll: 3
     };

export default function ModelComponent({setShowShareModel}){
    
    return(
        <div className="absolute top-0 left-0 bg-black/40 h-full w-full flex flex-col justify-center items-center">
            <div className=" p-4 bg-[#292b2c] rounded-xl max-w-[450px]">
                <div className="flex items-center mb-3 justify-between">
                    <p></p>
                    <p className="text-white">Share</p>
                    <CgClose onClick={()=>setShowShareModel(false)} color="gray"/>
                </div>
                <div className="flex w-[100%] bg-black text-white p-2 rounded-lg items-center mb-3">
                    <CgSearch color="white"/>
                    <input className=" ml-2 bg-transparent outline-none" placeholder="search..." /> 
                </div>
                <div className="flex max-w-[450px] max-h-[450px] flex-wrap border-b-[1px] border-gray-500 mb-4  w-[100%]">
                    {StoryData.map((item, index)=>{
                        return(
                            <RenderUsers
                                key={index}
                                username={item.username}
                                imgUrl={item.profileSrc}
                            />
                        )
                    })}
                </div>
                <div className="w-[100%] flex justify-center">
                    <div className="max-w-[400px] cursor-pointer transition-all max-h-[80px]">
                        <Slider {...settings}>
                            {IconData.map((item, index)=>{
                                return(
                                <IconRenderer
                                key={index}
                                Icon={item.Icon}  
                                socialName={item.socialName}
                                            
                                />
                                )
                            })
                            }
                    </Slider>
                    </div>
                </div>
            </div> 
        </div>
    )
}