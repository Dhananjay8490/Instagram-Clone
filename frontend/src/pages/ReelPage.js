import { IoPlay, IoVolumeHigh } from "react-icons/io5";
import PostProfileComponent from "../component/PostProfileComponent";


export default function ReelPage(){
    return(
        <div className="flex justify-center w-full">
            <div className=" relative h-[95vh] w-[390px] " style={{ backgroundRepeat:"no-repeat", backgroundImage:`url('https://s1.1zoom.me/b4952/517/Fast_food_Hamburger_Buns_Vegetables_Meat_products_531239_1080x1920.jpg')`, aspectRatio: '16/9', backgroundSize: 'cover', backgroundPosition:'center center'}}>
                <div className="flex flex-row-reverse ">
                    <IoVolumeHigh color="white" size={35} className="m-2 p-2 bg-white/20 rounded-full"/>
                </div>
                <div className="flex flex-col items-center justify-center h-[75vh] ">
                    <IoPlay color="white" size={60} className="p-4 bg-black/20 rounded-full"/>
                </div >               
                    <PostProfileComponent
                    imgSrc= 'https://morungexpress.com/uploads/2025/05/67487759_1747766097_202505203408476.jpg'
                    username= 'rashi khanna'
                    actionbutton= {true}
                     /> 
            </div>
        </div>
    )
}