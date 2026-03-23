import { useState } from "react"

export default function InputComponent({ placeholder, value ,setvalue, ...props}){
    const [isInputFoucused, setInputFoucused] = useState(false)
    return(
        <div className="relative w-[100%] border font-semibold border-gray-400 rounded-xl ">
            <p className={`z-[1px] absolute font-semibold text-gray-400 transition-all left-[8px] ${isInputFoucused || value?.length > 0 ? 'top-[0px] text-[12px]' : 'top-[16px]'} `}>{placeholder}</p>
            <input {...props} value={value} onChange={(e)=>setvalue(e.target.value)} onFocus={()=>setInputFoucused(true)} onBlur={()=> setInputFoucused(false)} className="z-[10px] relative bg-transparent w-[100%] p-4 text-white outline-none"></input>
        </div>
    )
}