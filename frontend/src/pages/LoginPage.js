import { ButtonComponent, InputComponent } from '../component';
import { instagramStory, InstaLogo } from '../Assets/img';
import { useContext, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaMeta } from "react-icons/fa6";
import axios from 'axios'
import { VariablesContext } from '../context/VariablesContext';


export default function LoginPage(){
    const [username, setUsername]= useState('')
    const [password, setPassword]= useState('')
    const{setUserInfo} = useContext(VariablesContext)

    const navigator= useNavigate()
    
    const loginHandler = ()=>{
      // if(username.length <3 || password.length < 3){
      //   return alert('pls enter valid password')
      // }

      // api call to backend
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/auth/login/',
        data: {username, password}
      }).then(res => {
        setUserInfo(res.data)
        localStorage.setItem('userInfo',JSON.stringify(res.data))
        navigator('/')
      }).catch(err => {
        console.log(err)
        alert(err.response.data.details)
      })
    }

      
    return(
         <>
              <div className='flex bg-black'>
                <img src={InstaLogo} alt='instagram logo' className='h-[70px] mt-12 ml-12' />
                  {/* left content */}
                  <div className='w-[55%] flex flex-col justify-center items-center'>
                  <h1 className='text-white text-[40px] w-[80%] text-center font-semibold'>
                    See everyday moments from your <span className='bg-gradient-to-r bg-clip-text text-transparent from-orange-500 to-pink-500 '>close friends</span>.</h1>
                  <img src={instagramStory} alt='instagramstory' className='h-[300px] w-[400px]'></img>
                  </div>
                  {/* right content */}
                  <div className='bg-[#152127] h-[100vh] w-[45%] flex justify-center items-center p-10 border-l-2 border-gray-500'>
                    <div className='flex flex-col gap-4 w-[100%] '>
                      <h1 className='text-white font-semibold text-[18px] my-3'>Log into Instagram</h1>
                      <InputComponent placeholder='Mobile number, Username or Email' value={username} setvalue={setUsername}/>
                      <InputComponent placeholder='password' type='password' value={password} setvalue={setPassword}/>
                      <ButtonComponent onClick={()=> loginHandler()} ButtonTitle="Log in" className='bg-[#0096f6] ' />
                      <ButtonComponent ButtonTitle="Forgot Password?" className="hover:bg-white/10 cursor-pointer transition-all" />
                      <ButtonComponent onClick={()=> navigator('/Signup')} ButtonTitle="Create new account" className='hover:bg-white/10 cursor-pointer transition-all border border-blue-600 mt-10' textclassName="text-[#0096f6]"/>
                      <div className='flex items-center justify-center text-white gap-1 font-semibold'>
                        <FaMeta color='white'/>
                        <p>Meta</p>
                      </div>
                    </div>
                  </div>
              </div>
         </>
    )
}