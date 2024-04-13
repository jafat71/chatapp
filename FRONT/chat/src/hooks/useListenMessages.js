import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useContact from "../zustand/useContact"
import notifSound from "../assets/sounds/notif.wav"
const useListenMessages = () => {
    const socket = useSocket()
    const {messages, setMessages} = useContact();

    useEffect(() => {
        socket?.on("newMessage", (newMessage)=>{
            newMessage.shouldShake = true
            const sound = new Audio(notifSound)
            sound.play()
            setMessages([...messages, newMessage])
        })
        return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
    
}

export default useListenMessages
