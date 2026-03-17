import { IoBookmarkOutline, IoSettings } from "react-icons/io5";
import { PiPulseFill } from "react-icons/pi";
import IconTextComponent from "./IconTextComponent";
import { GoMoon } from "react-icons/go";
import { TbMessageReport } from "react-icons/tb";
import { FaThreads } from "react-icons/fa6";
import { VscBlank } from "react-icons/vsc";



export default function AlsoFromMeta(){
    return(
        <div className="absolute bg-gray-700 p-2 rounded-3xl bottom-12 w-[90%]">
            <IconTextComponent Icon={IoSettings} text='Settings'/>    
            <IconTextComponent Icon={PiPulseFill} text='Your activity'/>    
            <IconTextComponent Icon={IoBookmarkOutline} text='Saved'/>    
            <IconTextComponent Icon={GoMoon} text='Switch appearance'/>    
            <IconTextComponent Icon={TbMessageReport} text='Report a problem'/>  
            <div className="my-5 h-[4px] w-[100%] bg-gray-500"/>  
            <IconTextComponent Icon={FaThreads} text='Threads'/>  
            <div className="my-5 h-[4px] w-[100%] bg-gray-500"/>  
            <IconTextComponent Icon={VscBlank} text='Switch accounts'/> 
            <div className="my-5 h-[1px] w-[100%] bg-gray-500"/>   
            <IconTextComponent Icon={VscBlank} text='Log out'/>    
            
        </div>
    )
}