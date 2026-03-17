import { ErrorPage, ExplorePage, HomePage, InstagramHelpPage, LoginPage, MesaagePage, ReelPage, SignupPage } from './pages';
import { useContext} from "react"
import { VariablesContext } from "./context/VariablesContext"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MessageComponent, SidenavComponent } from './component';
import { InstaLogo } from './Assets/img';
import { Route, Routes } from 'react-router-dom';
import Chat from './Test';

export default function Navigation(){
    // const [userInfo, setUserInfo] = useState(null)
    const {messageClicked, userInfo, userInfoLoading} = useContext(VariablesContext)

  if(userInfoLoading){
    return(
      <div className='flex flex-col justify-center items-center h-[90vh] text-white '>
      <img className='h-[60px] object-cover' src={InstaLogo} alt=''/>
    </div>
    )
  }

    return(
    <>
        <div className='flex pl-5 pt-8 w-[100%]'>
           {userInfo&&
             <div style={{width: messageClicked ? '55px' : '390px', maxWidth:'390px' , borderRight: '1px solid gray'}}>
               <SidenavComponent/>
        </div>
           }
          <Routes>
             {
                 userInfo? 
                 <>
                  <Route path='/' element={<HomePage/>} />
                  <Route path='/ReelPage' element={<ReelPage/>} />
                  <Route path='/Explore' element={<ExplorePage/>} />
                  <Route path='/Direct/Inbox' element={<MesaagePage/>} />
               </>
               :
               <>
                  <Route path='/Login' element={<LoginPage/>} />
                  <Route path='/Help' element={<InstagramHelpPage/>} />
                  <Route path='/Signup' element={<SignupPage/>} />
               </>
            } 

            <Route path='*' element={<ErrorPage/>} />
        </Routes>

            </div>
            {userInfo && 
              <MessageComponent/> 
            }
           
    </>
    )
}