import { useState } from "react"
import useContact from "../zustand/useContact"
import sendMessage from "../services/sendMessage"
import toast from "react-hot-toast"

export const useSendMessage = () => {
  
    const [loading, setLoading] = useState(false)
    const {messages, setMessages, selectedContact} = useContact()

    const sendMessageTo = async ({
        message
    }) => {
        setLoading(true)
        try {
            const data = await sendMessage({ id: selectedContact._id,message })
            if (data.error) {
                throw new Error(data.error)
            }
            setMessages([...messages,data])
            return data
        } catch (error) {
            toast.error("" + error)
        } finally {
            setLoading(false)
        }
    }

    return [
        loading,
        sendMessageTo
    ]
}
