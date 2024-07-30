import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useContact from "../zustand/useContact"
import notifSound from "../assets/sounds/notif.wav"
import { useLiveMessageDispatch, useLiveMessageValue } from "../pages/home/context/LiveContext";
const useListenMessages = () => {
    const socket = useSocket()
    const {messages, setMessages} = useContact();
    const dispatchLiveMessage = useLiveMessageDispatch()
    const liveMessageValue = useLiveMessageValue()

    useEffect(() => {
        socket?.on("newMessage", (newMessage)=>{
            dispatchLiveMessage({type:"SET",payload:newMessage})
            console.log(liveMessageValue)
            newMessage.shouldShake = true
            const sound = new Audio(notifSound)
            sound.play()
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
    
}

export default useListenMessages
