import { useEffect, useState } from "react"
import useContact from "../zustand/useContact"
import getMessages from "../services/getMessages"
import { useLiveMessageValue } from "../pages/home/context/LiveContext"

export const useGetMessages = () => {
  
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedContact} = useContact()
    const liveMessages = useLiveMessageValue()
    
    useEffect(() => {
        const getMessagesUser = async () => {
            setLoading(true)
            try {
                const data = await getMessages({ id: selectedContact._id })
                if (data.error) {
                    setMessages([])
                    throw new Error(data.error)
                }
                setMessages(data.messages)
                return data.messages
            } catch (error) {
                //toast.error("" + error)
            } finally {
                setLoading(false)
            }
        }
        selectedContact && getMessagesUser()
    }, [selectedContact,setMessages])
    
    return [
        loading,
        messages
    ]
}
