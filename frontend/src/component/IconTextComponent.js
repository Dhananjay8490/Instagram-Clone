export default function IconTextComponent({Icon, text}){
    return(
        <div className="flex w-[100%] outline-none text-white p-2 rounded-lg items-center  hover:bg-white/10 cursor-pointer mb-3">
            <Icon size={23}/>
            <p className="mx-3 text-[16px]">{text}</p>
        </div>
    )
}