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
            console.log(userValue)
            let typeUser = userValue.userLogged 
            ? userValue.userLogged 
            : userValue.userCreated 
            if (userValue) {
                const socket = io("https://chatapp-mpyu.onrender.com/", {
                    query: {
                        id: typeUser._id  
                    }
                })

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
        <SocketContext.Provider value={[socket, onlineUsers]}>
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
