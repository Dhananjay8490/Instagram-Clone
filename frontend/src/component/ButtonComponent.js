export default function ButtonComponent({ButtonTitle, onClick, ...props}){
    console.log(props)
    return(
        
        <div onClick={onClick} className={`p-2 w-[100%] rounded-3xl text-white text-center cursor-pointer transition-all ${props.className}`}>
        <p className={` ${props.textclassName} font-semibold `}>{ButtonTitle}</p>
        </div>
    )
} 
