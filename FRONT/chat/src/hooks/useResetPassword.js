/* eslint-disable react-hooks/rules-of-hooks */
import toast from "react-hot-toast"
import { useAuthUserSetter } from "../context/AuthContext"
import validateResetInfo from "../services/validateResetInfo"
import sendReset from "../services/sendReset"

export const useResetPassword = () => {

    const setIsAuthenticated = useAuthUserSetter()
    
    const reset = async ({
        username,
        password,
        newPassword,
        confirmNewPassword,
    }) => {
        const validData = validateResetInfo({         
            username,
            password,
            newPassword,
            confirmNewPassword, })
        if (!validData) return;
        try {
            const data = await sendReset({ 
                username,
                password,
                newPassword,
                confirmNewPassword })
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.setItem("user",JSON.stringify(data))
            setIsAuthenticated(data)
            return data
        } catch (error) {
            toast.error("" + error)
            return null
        } 
    }

    return [
        reset
    ]
}
