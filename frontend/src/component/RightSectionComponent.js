import { useContext, useEffect, useState } from "react";
import ProfileRenderer from "./ProfileRenderer";
import { getSuggestedAccounts } from "../utils/api";
import { VariablesContext } from "../context/VariablesContext";

 
export default function RightSectionComponent(){

    const [data, setData]= useState([])
    const {userInfo} = useContext(VariablesContext)
    useEffect(()=>{
        getSuggestedAccounts().then(res =>{
            setData(res.data)
        }).catch(err =>{
            console.log(err)
        })
    },[])

    return(
        <div className="w-[100%] my-4 ">
            <div className="w-[270px]  ">
                <ProfileRenderer username={userInfo?.user.username} subText={userInfo?.user.username} actionText='Switch' imgSrc={userInfo?.user?.profilePicture}/>
                <div className="m-4 flex object-cover justify-between">
                <p className="text-gray-400 font-semibold">Suggested for you</p>
                <p className="text-white">See all</p>
                </div>

                {data.map((record, index) =>{
                    return(
                        <ProfileRenderer username={record.username} key={index} imgSrc={record.profilePicture} />
                    )
                })}
                </div>
                
        </div>
    )
}