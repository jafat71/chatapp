import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useContact from "../zustand/useContact"
import notifSound from "../assets/sounds/notif.wav"
import { useLiveMessageDispatch } from "../pages/home/context/LiveContext";
const useListenMessages = () => {
    const socket = useSocket()
    const {messages, setMessages} = useContact();
    const dispatchLiveMessage = useLiveMessageDispatch()

    useEffect(() => {
        socket?.on("newMessage", (newMessage)=>{
            dispatchLiveMessage({type:"SET",payload:newMessage})
            console.log(newMessage)
            newMessage.shouldShake = true
            const sound = new Audio(notifSound)
            sound.play()
            //TODO: newMessage.senderId === context Actual USer.id
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
    
}

export default useListenMessages
