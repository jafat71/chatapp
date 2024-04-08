/* eslint-disable react-hooks/rules-of-hooks */
import toast from "react-hot-toast"
import { useAuthUserSetter } from "../context/AuthContext"
import validateLoginInfo from "../services/validateLoginInfo"
import sendLogin from "../services/sendLogin"

export const useLogin = () => {

    const setIsAuthenticated = useAuthUserSetter()
    
    const login = async ({
        username,
        password
    }) => {
        const validData = validateLoginInfo({ username, password })
        if (!validData) return;
        try {
            const data = await sendLogin({ username, password })
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
        login
    ]
}
