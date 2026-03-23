import { createContext, useEffect, useRef, useState } from "react";
import {  useNavigate } from "react-router-dom";
export const VariablesContext = createContext()

export default function VariablesState ({children}){
   const [showStory, setShowStory] = useState(false)
   const [clickStoryData, setclickStoryData] = useState({})
   const [messageClicked, setMessageClicked] = useState(false)
   const [userInfo, setUserInfo] = useState(null)
   const WebSocketRef = useRef(null)
   const navigate = useNavigate()
   const [input, setInput] = useState("");
    
   useEffect(()=>{
      const data = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
      if(data){
         setUserInfo(data)
         const ws1 = new WebSocket("ws://127.0.0.1:8000/ws/notify/");
         ws1.onmessage = event =>{
            const data =JSON.parse(event.data)
         }
         ws1.onclose = () =>{
            ws1.close()
         }
         WebSocketRef.current = ws1
         navigate('/')
      }else{
         navigate('login')
      }

      return()=>{
         if (WebSocketRef.current){
            WebSocketRef.current.close();
         }
      }
   },[])

   const sendMessage = (payload ={}) => {
      if (WebSocketRef.current && input.trim() !== "") {
         WebSocketRef.current.send(JSON.stringify(payload));
         setInput("");
    }
  };

    return(
         <VariablesContext.Provider value={{
            showStory, setShowStory,
            messageClicked, setMessageClicked,
            userInfo, setUserInfo,
            clickStoryData, setclickStoryData,
            WebSocketRef,
            sendMessage,
         }}>
            {children}
         </VariablesContext.Provider>
    )
}