import { useState } from "react"
import useContact from "../zustand/useContact"
import sendMessage from "../services/sendMessage"
import toast from "react-hot-toast"
import { decryptMessage } from "../services/cypher"

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
            const decryptedMessage = {
                ...data,
                message: decryptMessage(data.message)
            };
            setMessages([...messages,decryptedMessage])
            return data
        } catch (error) {
            console.log(error)
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
