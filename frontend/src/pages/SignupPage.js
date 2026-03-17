import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { ButtonComponent, InputComponent } from "../component";
import { useNavigate } from "react-router-dom";
import { FaMeta } from "react-icons/fa6";

export default function SignupPage(){
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    const [fullname, setFullname]= useState('')
    const [newusername, setNewusername]= useState('')
    const navigator = useNavigate()

    return(
        <div className='bg-[#152127] flex flex-col justify-center items-center p-10 border-l-2 border-gray-500'>
            <div className="flex flex-col w-[38%] text-white ">
                <IoChevronBack className="text-gray-400 font-semibold size-6 mb-2 ml-[-10px]"/>
                <div className='flex items-center text-[16px] text-white gap-1 font-semibold'>
                    <FaMeta color='white'/>
                    <p>Meta</p>
                </div>
                <p className="text-[25px] font-semibold">Get started on Instagram</p>
                <p>Sign up to see photos and videos from your friends.</p>
                <p className="text-[18px] font-semibold mt-3 mb-2">Mobile number or email</p>
                <InputComponent placeholder='Mobile number or Email' value={username} setvalue={setUsername} />
                <p className="text-[16px] mt-2 font-semibold">You may receive notifications from us.<a href="https://help.instagram.com/574047304429005" target="_blank" rel="noreferrer" className="text-[#0095f6] font-semibold"> Learn why we ask for your contact information</a></p>
                <p className="text-[18px] font-semibold mt-3 mb-2">Password</p>
                <InputComponent placeholder='password' type='password' value={password} setvalue={setPassword}/>
                <p className="text-[18px] font-semibold mt-3 mb-2">Birthday</p>
                <div className="flex w-[100%] items-center font-semibold text-gray-400">
                    <select className="bg-[#152127] mr-2 w-[100%] border border-gray-500 p-4 rounded-lg outline-none">
                    <option>Month</option>
                    <option>Jan</option>
                    <option>Feb</option>
                    <option>Mar</option>
                    <option>Apr</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>Aug</option>
                    <option>Sep</option>
                    <option>Oct</option>
                    <option>Nov</option>
                    <option>Dec</option>
                    </select>
                    <select className="bg-[#152127] mx-2 w-[100%] border border-gray-500 p-4 rounded-lg outline-none">
                    <option>Day</option>
                    {Array.from(Array(31).keys()).map(number =>{
                        return(
                            <option key={number}>{number + 1}</option>
                        )
                    })}
                    </select>
                    <select className="bg-[#152127] ml-2 w-[100%] border border-gray-500 p-4 rounded-lg outline-none">
                    <option>Year</option>
                    {Array.from(Array(31).keys()).map(number =>{
                        return(
                            <option key={number}>{number + 1}</option>
                        )
                    })}
                    </select>
                </div>
                <p className="text-[18px] font-semibold mt-3 mb-2">Name</p>
                <InputComponent placeholder='Full name'value={fullname} setvalue={setFullname}/>
                <p className="text-[18px] font-semibold mt-3 mb-2">Username</p>
                <InputComponent placeholder='Username' value={newusername} setvalue={setNewusername} />
                <p className="text-[15px] mb-3 mt-6 font-semibold">People who use our service may have uploaded your contact information to Instagram. <a href="https://www.facebook.com/help/instagram/261704639352628" target="_blank" rel="noreferrer" className="cursor-pointer text-[#0095f6] font-semibold"> Learn more</a>.</p>
                <p className="text-[15px] mb-3 font-semibold">By tapping Submit, you agree to create an account and to Instagram's  <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer" className="text-[#0095f6] cursor-pointer font-semibold"> Terms</a>,  <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noreferrer" className="text-[#0095f6] cursor-pointer font-semibold"> Private Policy</a> and  <a href="https://privacycenter.instagram.com/policies/cookies/" target="_blank" rel="noreferrer" className="text-[#0095f6] cursor-pointer font-semibold"> Cookies Policy</a>.</p>
                <p className="text-[15px] mb-3 font-semibold">The  <a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noreferrer" className="text-[#0095f6] cursor-pointer font-semibold"> Private Policy</a> describes the ways we can use the information we collect when you create an account. For example, we use this information to provide, personalize and improve our products, including ads.</p>
                <ButtonComponent onClick={()=> navigator('/Login')} ButtonTitle="Submit" className='bg-[#0096f6] mt-5 ' />
                <ButtonComponent onClick={()=> navigator('/Login')} ButtonTitle="I already have an account" className='hover:bg-white/10 cursor-pointer transition-all border border-grey-400 mt-3'/>
            </div>
        </div>
    )
}