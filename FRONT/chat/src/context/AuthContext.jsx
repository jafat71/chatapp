/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    return (
        <AuthContext.Provider value={[
            authUser,
            setAuthUser
        ]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthUserValue = () => {
    const fullContext = useContext(AuthContext)
    return fullContext[0]
}

export const useAuthUserSetter = () => {
    const fullContext = useContext(AuthContext)
    return fullContext[1]
}