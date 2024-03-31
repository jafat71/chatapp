import { useDisplayDispatch } from "../../GlobalContext";
import ChatIcon from "./ChatIcon"

const Contact = () => {
    const dispatchDisplay = useDisplayDispatch()
    const handleClick = () => {
        (!window.matchMedia("(min-width: 768px)").matches) && dispatchDisplay({ type: "CHAT" })
    };
    return (
        <div className="flex flex-row items-center justify-between hover:bg-gray-200  hover:text-black transition-all duration-200 rounded p-2 py-1 cursor-pointer w-full" onClick={handleClick}>
            <div className="p-2 rounded-sm flex flex-row items-center gap-1 text-sm">
                <div className="avatar online">
                    <div className="w-8 rounded-full">
                        <img  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>                
                <h2>Name</h2>
            </div>
            <div>
                <ChatIcon colorFill1={"#ffffff"} colorfill2={"#F9721B"}></ChatIcon>
            </div>
        </div>
    )
}

export default Contact