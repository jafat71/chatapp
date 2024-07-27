/* eslint-disable react/prop-types */
import { useConnectedUsersValue } from "../../context/SocketContext";
import { useDisplayDispatch } from "../../pages/home/context/DisplayModeContext";
import { useLiveMessageDispatch, useLiveMessageValue } from "../../pages/home/context/LiveContext";
import useContact from "../../zustand/useContact";
import ChatIcon from "./ChatIcon"

const Contact = ({conversation}) => {
    const liveMessages = useLiveMessageValue()
    const disptachLiveMessages = useLiveMessageDispatch()
    const dispatchDisplay = useDisplayDispatch()
    const handleClick = () => {
        (!window.matchMedia("(min-width: 768px)").matches) && dispatchDisplay({ type: "CHAT" })
        setSelectedContact(conversation)
        disptachLiveMessages({type:"UNSET"})
    };
    const {selectedContact,setSelectedContact } = useContact()

    const isSelected = selectedContact?._id === conversation._id
    const onlineUsers =  useConnectedUsersValue();
    const isOnline = onlineUsers.includes(conversation._id)
    const hasNewMessages =  liveMessages.senderId===conversation._id
    return (
        <div className={`flex flex-row items-center justify-between hover:bg-gray-200  hover:text-black transition-all duration-200 rounded p-2 py-1 cursor-pointer w-full 
        ${isSelected ?" bg-rose-600 ":""}
        ${hasNewMessages ? "bg-green-500" : ""}
        `} onClick={handleClick}>
            <div className="p-2 rounded-sm flex flex-row items-center gap-1 text-sm">
                <div className={`avatar ${isOnline ?' online':'offline'}`}>
                    <div className="w-8 rounded-full">
                        <img  src={conversation.profilePic} />
                    </div>
                </div>                
                <h2>{conversation.fullname}</h2>
            </div>
            <div>
                <ChatIcon colorFill1={"#ffffff"} colorfill2={"#F9721B"}></ChatIcon>
            </div>
        </div>
    )
}

export default Contact