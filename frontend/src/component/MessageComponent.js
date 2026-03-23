import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiMessengerLine } from "react-icons/ri";


export default function MessageComponent(){
    return(
        <div className=" flex flex-row-reverse bg-blue max-w-[300px] items-center sticky bottom-[30px] left-[1500px]">
            <div className="bg-white/15 rounded-full w-max flex  px-6 p-4 items-center mr-4">
                <RiMessengerLine color="white" size='25' />
                <p className="font-semibold text-white ml-1 mr-12">Messages</p>
                <img className="h-[20px] w-[20px] rounded-full object-cover z-[10]" src='https://morungexpress.com/uploads/2025/07/39509717_1752119914_202507103448625.jpg'alt=""/>
                <img className="h-[20px] w-[20px] rounded-full object-cover -m-2 z-[8]" src='https://morungexpress.com/uploads/2025/07/70305430_1752119971_202507103448624.jpg' alt=""/>
                <img className="h-[20px] w-[20px] rounded-full object-cover z-[6]" src='https://morungexpress.com/uploads/2025/05/67487759_1747766097_202505203408476.jpg' alt=""/>
                <div className="bg-gray-700 p-[0.18rem] -m-1 rounded-full z-[4]">
                <HiOutlineDotsHorizontal />
            </div>
            
            </div>
        </div>
    )
}