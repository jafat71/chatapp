import { useEffect } from "react";
import { useSocket } from "../context/SocketContext"
import useContact from "../zustand/useContact"
import notifSound from "../assets/sounds/notif.wav"
import { decryptMessage } from "../services/cypher";
const useListenMessages = () => {
    const socket = useSocket()
    const {messages, setMessages,selectedContact } = useContact();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            newMessage.message = decryptMessage(newMessage.message);
            const sound = new Audio(notifSound);
            sound.play();
            if (newMessage.senderId !== selectedContact._id) {
                return;
            }
            setMessages([...messages, newMessage])
        };

        socket?.on("newMessage", handleNewMessage);
        return () => socket?.off("newMessage", handleNewMessage);
    }, [socket, setMessages, messages])
    
}

export default useListenMessages
