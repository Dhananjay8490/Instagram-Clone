import { user } from "../Assets/img";

export default function ProfileRenderer({actionText='Follow', subText, imgSrc, username, Icon}){
    return(
        <div className="flex items-center gap-4 justify-between my-5 w-[100%]">
            <div className="flex items-center">
            <img className="w-[40px] h-[40px] border-[1px] border-gray-300 rounded-full mr-4 object-cover" src={imgSrc?.length>2? process.env.REACT_APP_BASE_URL + imgSrc : user}  alt='Rashi khanna' />
                <div className="flex mr-7 flex-col">
                <p className="text-white text-[15px] font-semibold">{username}</p>
                <p className="text-gray-400 text-[12px] -mt-1 font-semibold">{subText}</p>
                </div>
            </div>
            {Icon ?
                <Icon color='gray' size={25} />
                :
                <button className="text-sky-500 text-[12px] font-semibold">{actionText}</button>
            }
            
        </div>
    )
}