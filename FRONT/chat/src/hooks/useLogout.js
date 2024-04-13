/* eslint-disable react-hooks/rules-of-hooks */
import sendLogout from "../services/sendLogout"
import toast from "react-hot-toast"
import { useAuthUserSetter } from "../context/AuthContext"

export const useLogout = () => {

    const setIsAuthenticated = useAuthUserSetter()

    const logout = async () => {
        try {
            const data = await sendLogout();
            if (data.error) {
                throw new Error(data.error)
            }
            localStorage.removeItem("user")
            setIsAuthenticated(null)
            return data
        } catch (error) {
            toast.error("" + error)
            return null
        }
    }

    return [
        logout
    ]
}
