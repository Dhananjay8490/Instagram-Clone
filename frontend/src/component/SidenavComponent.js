import { GoHeartFill, GoHome, GoHomeFill } from "react-icons/go"; 
import { InstaLogo, InstaNameLogo } from "../Assets/img";
import { FiPlusSquare, FiSearch } from "react-icons/fi";
import { ImCompass2 } from "react-icons/im";
import { PiFilmSlateBold, PiFilmSlateFill, PiPaperPlaneTiltBold, PiPaperPlaneTiltFill } from "react-icons/pi";
import { IoCloseSharp, IoHeartOutline} from "react-icons/io5";
import { CgDetailsMore, CgProfile } from "react-icons/cg";
import {useLocation, useNavigate} from 'react-router-dom';
import { FaCompass, FaSquarePlus} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import '../Assets/scss/sidenav-component.scss'
import ProfileRenderer from "./ProfileRenderer";
import { MdCancel } from "react-icons/md";
import AlsoFromMeta from "./AlsoFromMeta";
import { VariablesContext } from "../context/VariablesContext";


const NavbarData = [
    {Icon:GoHome, ActiveIcon: GoHomeFill, text:'home', NavbarUrl:'/'},
    {Icon:FiSearch, ActiveIcon: FaSearch, text: 'search'},
    {Icon:ImCompass2, ActiveIcon: FaCompass, text: 'explore', NavbarUrl:'/Explore'},
    {Icon:PiFilmSlateBold, ActiveIcon:PiFilmSlateFill, text: 'reels', NavbarUrl:'/ReelPage'},
    {Icon:PiPaperPlaneTiltBold, ActiveIcon:PiPaperPlaneTiltFill, text: 'messages', NavbarUrl:'/Direct/Inbox'},
    {Icon:IoHeartOutline, ActiveIcon:GoHeartFill, text: 'notifications'},
    {Icon:FiPlusSquare, ActiveIcon:FaSquarePlus, text: 'create'},
    {Icon:CgProfile, text: 'profile'}
]

function SideNavItem({Icon, text, isActive, onClick, setSearchClicked, setAlsoFromMeta, setMessageClicked, messageClicked}){

    const onclickhandler = () => {
    
        if(onClick){
            onClick()
        }
        if(text === 'messages'){
            setMessageClicked(true)
        }
        else{
            setMessageClicked(false)
        }
        if(text === 'search'){
            setSearchClicked(true)
        }
        else{
            setSearchClicked(false)
        }
        if(text === 'More'){
            setAlsoFromMeta(true)
        }
        else{
            setAlsoFromMeta(false)
        }
    }
    
    return(
        <div onClick={onclickhandler} 
            id="side-nav-item"
            className={`flex ${isActive && 'bg-white/10'} items-center h-[44px] text-white gap-2 hover:bg-white/10 cursor-pointer`}>
            <Icon size={25}/>
            <p id="nav-text"  className="text-[16px] first-letter:uppercase">{text}</p>
        </div>
    )
}

export default function SidenavComponent(){

    const location = useLocation()
    const [isSearchClicked, setSearchClicked] = useState(false)
    const [alsoFromMeta, setAlsoFromMeta] = useState(false)
    const {messageClicked, setMessageClicked} = useContext(VariablesContext)
    const navigate = useNavigate()
    return(
        <div onClick={alsoFromMeta ? ()=> setAlsoFromMeta(false): undefined} className={`navbar flex flex-col justify-between ${isSearchClicked || messageClicked ? 'side-nav-search ' : 'main-side-nav'}`}>
            <div className="flex flex-col gap-2 ">
            <img src={InstaNameLogo} alt="Instagram logo" className="insta-text h-[26px] w-[100px] mb-8"/>
            <img src={InstaLogo} alt="Instagram logo" className="insta-logo  object-cover w-[50px]  mb-2"/>
            {NavbarData.map((item, index)=>{

                let isActive = false
                if(isSearchClicked){
                    if(item.text === 'search'){
                        isActive = true
                    }
                }
                else{
                    isActive = location.pathname === item.NavbarUrl
                }

                return(
                    <SideNavItem 
                    key={index} 
                    Icon={isActive ? item.ActiveIcon: item.Icon} 
                    text={item.text} 
                    isActive={isActive} 
                    onClick={()=> navigate(item.NavbarUrl)}
                    setSearchClicked={setSearchClicked}
                    setAlsoFromMeta={setAlsoFromMeta}
                    setMessageClicked={setMessageClicked}
                    />
                )
            })}
            
            </div>
            <div className="flex flex-col w-full relative">
            <SideNavItem Icon={CgDetailsMore} text='More' setSearchClicked={setSearchClicked} setAlsoFromMeta={setAlsoFromMeta}/>
            {alsoFromMeta &&
                <AlsoFromMeta />
            }
            </div>
                <div className={`search-drawer ${isSearchClicked ? 'expanded' : 'collapsed'}`}>
                    <p className="text-white mb-[20px] text-[25px] font-semibold ">Search</p>
                    <div className="flex w-[100%]  text-white p-2 rounded-lg justify-between items-center bg-white/20 mb-3">
                        <input className=" bg-transparent outline-none" placeholder="search..." /> 
                        <MdCancel color="white"/>
                    </div>
                    <div className="my-5 h-[1px] w-[100%] bg-gray-600"/>
                    <div className="flex justify-between my-3 items-centers">
                        <p className="text-white font-semibold">recent</p>
                        <p className="text-sky-500 font-semibold"> clear all</p>
                    </div>
                    <ProfileRenderer subText= 'aaradhana6604' imgSrc="https://morungexpress.com/uploads/2025/05/67487759_1747766097_202505203408476.jpg" username='aaradhana6604' Icon={IoCloseSharp}/>
                    <ProfileRenderer subText= 'aaradhana6604' imgSrc='https://morungexpress.com/uploads/2025/07/70305430_1752119971_202507103448624.jpg' username='Dia Mirza' Icon={IoCloseSharp}/>
                    <ProfileRenderer subText= 'aaradhana6604' imgSrc='https://morungexpress.com/uploads/2025/07/39509717_1752119914_202507103448625.jpg' username='Neha Dhupia' Icon={IoCloseSharp}/>
                                    
                </div>
        </div>
    )
}