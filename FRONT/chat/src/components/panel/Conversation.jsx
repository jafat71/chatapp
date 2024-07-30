/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useEffect, useRef, useState } from "react"
import Message from "./Message"
import WelcomeImg from "./WelcomeImg"
import useContact from "../../zustand/useContact"
import { useGetMessages } from "../../hooks/useGetMessages"
import SkeletonChat from "./SkeletonChat"
import useListenMessages from "../../hooks/useListenMessages"
import { useLiveMessageValue } from "../../pages/home/context/LiveContext"

const Conversation = () => {

    useListenMessages();

    const { selectedContact, setSelectedContact } = useContact()
    //TODO: CREAR CONTEXTO de Contacto actual para chequeo de conversacion actual
    useEffect(() => {
        return () => {
            setuserInfo(null)
        }
    }, [setSelectedContact])

    const lastMessage = useRef()

    const [userInfo, setuserInfo] = useState({})
    useEffect(() => {
        setuserInfo(JSON.parse(localStorage.getItem("user")))
    }, [])
    const [loading, messages] = useGetMessages()
    useEffect(() => {
        messages && setTimeout(() => {

            lastMessage.current?.scrollIntoView({ behavior: "smooth" })
        }, 1000)
    }, [messages]);

    const noMessages = () => {
        return (
            <div className="flex flex-col items-center text-white justify-center h-full">
                <WelcomeImg></WelcomeImg>
                {
                    userInfo.userLogged ? (
                        <h2>HI {userInfo.userLogged.fullname} - {userInfo.userLogged.username}</h2>
                    ) : (
                        userInfo.userCreated ? (
                            <h2>HI {userInfo.userCreated.fullname} - {userInfo.userCreated.username}</h2>
                        ) : (
                            <span className="loading loading-spinner"></span>
                        )
                    )
                }
                <p>Choose a friend to start chatting :)</p>
            </div>
        )
    }


    const getMessages = () => {
        return (
            <div className="max-h-full">
                {
                    loading && [...Array(7)].map((_, idx) => <SkeletonChat key={idx} className="w-full" />)
                }
                {
                    !loading && messages.length === 0 && (<p className="flex flex-col items-center justify-center text-center font-thin text-xl">Send a meesage to start a conversation</p>)
                }
                {
                    !loading && messages.map((message) => (
                        <div key={message._id} ref={lastMessage}>
                            <Message message={message} />
                        </div>
                    ))
                }

            </div>
        )
    }

    return (
        <div className="w-full flex flex-col h-5/6 overflow-y-auto">

            {
                selectedContact
                    ? getMessages()
                    : noMessages()
            }

        </div>
    )
}

export default Conversation