import { useNavigate } from "react-router-dom"

export default function ErrorPage(){
    const navigate = useNavigate()
    return(
        <div className="flex flex-col items-center justify-center text-white w-[100%]">
            <p>Sorry, this page isn't available.</p>
            <p>The link you followed may be broken, or the page may have been removed. <span onClick={()=>navigate('/')} className="text-sky-500 cursor-pointer">Go back to Instagram.</span></p>
        </div>
    )
}