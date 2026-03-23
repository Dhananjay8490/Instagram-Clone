import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdVerified } from "react-icons/md";

export default function PostProfileComponent({imgSrc, username, createdAt,isVerified, actionbutton}){
    return(
        
         <div className="flex  items-center justify-between w-[100%]">
            <div className="mx-2 flex  items-center">
                <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full p-[0.12rem] mr-2">
            <img className='p-1 bg-black rounded-full h-[40px] w-[40px] object-cover ' src={imgSrc} alt={username} />
            </div>
            <p className="text-white font-bold text-[12px] flex items-center">{username} {isVerified && <MdVerified color="#0096f6" size='17'/>}</p>
            <span className="text-gray-500 mx-1">•</span>
            {createdAt &&
                <span className="text-gray-500 mx-1 text-[12px]">{createdAt}</span>
            }
            {actionbutton &&
                <button className="border border-gray-500 p-1 rounded-xl text-white font-semibold">Follow</button>   
            }
            </div>
            {createdAt && 
                <HiOutlineDotsHorizontal color="white"/>
            }
        </div>
    )
}