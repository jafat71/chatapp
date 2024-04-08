/* eslint-disable react-hooks/rules-of-hooks */
import validateInfo from "../services/validateInfo"
import sendSignUp from "../services/sendSignUp"
import toast from "react-hot-toast"
import { useAuthUserSetter } from "../context/AuthContext"


const useSignup = () => {

    const setIsAuthenticated = useAuthUserSetter()

    const signup = async ({
        fullname,
        username,
        password,
        confirmPassword,
        gender
    }) => {
        const validData = validateInfo({ fullname, username, password, confirmPassword, gender })
        if (!validData) return;
        try {
            const data = await sendSignUp({ fullname, username, password, confirmPassword, gender })
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
        signup
    ]
}

export default useSignup
