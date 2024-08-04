/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthUserValue } from "./AuthContext";
import io from 'socket.io-client'
export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const userValue = useAuthUserValue()

    useEffect(() => {
        const loadUser = () => {
            let typeUser = userValue && userValue.userLogged 
            ? userValue.userLogged 
            : null 
            if (typeUser) {
                const socket = io(import.meta.env.PROD 
                    ? import.meta.env.VITE_API_URL 
                    : import.meta.env.VITE_API_URL_DEV, {
                    withCredentials: true,
                    query: {
                        id: typeUser._id  
                    },
                    transports: ["websocket", "polling"] // Asegura que se intenten múltiples métodos de transporte
                });


                setSocket(socket)

                socket.on("getOnlineusers", (users) => {
                    setOnlineUsers(users)
                })
                return () => socket.close();
            } else {
                if (socket) {
                    socket.close();
                    setSocket(null);
                }
            }
        }
        loadUser()

    }, [userValue]);

    return (
        <SocketContext.Provider value={[
            socket, 
            onlineUsers]}>
            {children}
        </SocketContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSocket = () => {
    const fullContext = useContext(SocketContext)
    return fullContext[0]
}
// eslint-disable-next-line react-refresh/only-export-components
export const useConnectedUsersValue = () => {
    const fullContext = useContext(SocketContext)
    return fullContext[1]
}
