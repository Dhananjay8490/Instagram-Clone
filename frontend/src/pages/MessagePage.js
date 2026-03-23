import { BiSearch } from 'react-icons/bi'
import { CgChevronDown } from 'react-icons/cg'
import { MdEditSquare } from 'react-icons/md'
import { StoryData } from '../Tempfiles/tempdate'
import { useContext, useEffect, useRef, useState } from 'react'
import { fetchMessages, getPreviouslyChat, getSuggestedAccounts} from '../utils/api'
import { user } from "../Assets/img";
import { VariablesContext } from '../context/VariablesContext'

const NoteComponent = ({username, profileSrc, noteText}) => {
  return (
        <div className="mx-3 flex flex-col items-center relative">
            <img className="p-1 bg-black rounded-full mt-8 h-[60px] w-[60px] object-cover" alt={username} src={profileSrc?.length>2? process.env.REACT_APP_BASE_URL + profileSrc : user} />
            <p className="text-white text-[14px]">{username?.length > 10 ? username.slice(0, 10)+'...' : username}</p>
            <div className='absolute text-[10px] w-[70px] h-[50px] rounded-md top-0 left-0 p-2 bg-white/15'>
              {noteText}
            </div>
        </div>
  )
}

const MessagePage = () => {

    const {userInfo} = useContext(VariablesContext)
    const [data, setData] = useState([])
    const [SuggestedData, setSuggestedData] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [currentUsername, setCurrentUsername] = useState(null)


    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const socketRef = useRef(null);

    useEffect(() => {
      if(!currentChat) return;
      const chat_room = [userInfo.user.id, currentChat].sort().join('_')
      fetchMessages(chat_room).then(res => {
        setMessages(res.data);
      }).catch(err => {})
      const ws = new WebSocket(`ws://localhost:8000/ws/chat/${chat_room}/`);
      socketRef.current = ws;

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Received:", data);
        if (data.message) {
          setMessages((prev) => [...prev, data]);
        }
      };

      ws.onclose = () => console.log("WS closed");

      return () => {
        ws.close();
      };
    }, [currentChat]);


    useEffect(()=>{
      const messageContainer = document.getElementById('messageContainer');
      if(messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight;
    },[messages])

    const tempNotifySocket = (payload) =>{
        const ws1 = new WebSocket(`ws://localhost:8000/ws/notify/${currentChat}/`);
        ws1.onopen = () => {
            ws1.send(JSON.stringify(payload));
        }
    }

    const sendMessage = () => {
      if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
      socketRef.current.send(JSON.stringify({ sentBy: userInfo.user.id, sentTo: currentChat, message: input }));
      tempNotifySocket({type:'message', payload : {username :currentUsername, msg:input,  fromUserId: userInfo.user.id}})
      setInput("");
    };

    useEffect(()=>{
        getPreviouslyChat().then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        })
    },[])

    useEffect(()=>{
      getSuggestedAccounts().then(res =>{
        setSuggestedData(res.data)
      }).catch(err=>{
        console.log(err)
      })
    },[])




    console.log('messages', messages);
    return(
      <div className='flex w-[100%] max-h-[80vh]'>
      {/* left panel [single messags] */}
      <div className='text-white border-r-[1px] border-gray-800 w-[25%] p-2'>
        {/* switch profile and edit */}
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <p>{userInfo?.user?.username}</p>
            <CgChevronDown color='white' />
          </div>
          <MdEditSquare color='white'/>
        </div>
        {/* input */}
        <div className='flex items-center p-2 rounded-xl bg-white/20 mt-4'>
          <BiSearch color='white'/>
          <input placeholder='Search' className='pl-2 outline-none bg-transparent w-[100%]' />
        </div>
        {/* notes */}
        <div className='flex items-center mt-3'>
          {SuggestedData.slice(0, 4).map((record, index) =>(
            <NoteComponent profileSrc={record?.profilePicture} username={record?.username} noteText={record?.username} key={index} />
          ))}
        </div>
        {/* message and request */}
        <div className='flex items-center justify-between'>
          <p>Message</p>
          <p>Requests(1)</p>
        </div>

        {data.map((record, index) => (
          <div onClick={()=>{setCurrentChat(record.id); setCurrentUsername(record.username)}} key={index} className='flex items-center p-2 hover:bg-white/10 rounded-xl cursor-pointer'>
            <img className="p-1 bg-black rounded-full h-[50px] w-[50px] object-cover" alt={record.username} src={record.profilePicture?.length > 2 ? record.profilePicture : user} />
            <div className='ml-3'>
              <p>{record.username}</p>
              <p className='text-white/50 text-[14px]'>- {record.last_message?.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=' w-[75%]' >
        {/* build a chat ui interface */}
        {currentChat ?
          <div className='flex flex-col items-center justify-center h-[90vh]'>
            <h1 className='text-white text-[24px] font-semibold'>Chat with {data.find(item => item.id === currentChat)?.username}</h1>
            <p className='text-white/50 text-[16px]'>This is where the chat messages would appear.</p>
            {/* implement input and left right cards for message screen */}
            <div className='w-[90%] min-h-[85%]'>
              <div id='messageContainer' className='bg-white/20 p-4 rounded-lg h-[90%] w-[100%] mt-6 overflow-y-auto'>
                <div className='flex flex-col gap-4'>
                  {messages.map((m, i) => {
                    const isSelf = String(m.sentBy) === String(userInfo.user.id);
                    return(
                      <div key={i} className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
                        <div className={`text-white p-2 rounded-lg max-w-[60%] ${isSelf ? 'bg-[#6E8AFA]' : 'bg-white/30'}`}>
                          {m.message}
                        </div>
                      </div>  
                    )
                  })}
                  {/* <div className='flex justify-end'>
                    <div className='bg-[#6E8AFA] text-white p-2 rounded-lg max-w-[60%]'>
                      I'm good, thanks! How about you?  
                    </div>    
                  </div> */}
                </div>
              </div>
            </div>
            <div className='w-[90%] h-[10%] flex items-center gap-2'>
              <input onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : undefined} value={input} onChange={e => setInput(e.target.value)} className='w-[100%] p-2 rounded-lg bg-white/20 text-white outline-none' placeholder='Type your message here...' />
              <button onClick={sendMessage} className='bg-[#6E8AFA] text-white px-8 py-2 rounded-lg font-semibold'>Send</button>
            </div>
            
          </div>
        :
          <div className='flex flex-col items-center justify-center h-[90vh]'>
            <h1 className='text-white text-[24px] font-semibold'>Your Messages</h1>
            <p className='text-white/50 text-[16px]'>Send private photos and messages to a friend or group.</p>
            <button className='mt-4 bg-white text-black px-4 py-2 rounded-lg font-semibold'>Send Message</button>
          </div>
        }

      </div>
    </div>
  )
}

export default MessagePage  