import { useState } from "react"
import { getContacts } from "../services/getContacts"
import toast from "react-hot-toast"
import useContact from "../zustand/useContact"


export const useGetContacts = () => {
    const [loading, setLoading] = useState(false)
    const { setContacts } = useContact()

    const getContactList = async () => {
        setLoading(true)
        try {
            const data = await getContacts()
            if (data.error) {
                throw new Error(data.error)
            }
            setContacts(data.users)
        } catch (error) {
            toast.error("" + error)
        } finally {
            setLoading(false)
        }
    }



    return {
        loading,
        getContactList
    }
}
