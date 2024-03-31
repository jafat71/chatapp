import { useEffect, useState } from "react"
import Message from "./Message"
import WelcomeImg from "./WelcomeImg"
import { useDisplayValue } from "../../GlobalContext"

const Conversation = () => {
    const [messagesExist, setMessagesExist] = useState(true)

    const actualDisplay = useDisplayValue()  
    useEffect(() => {
    }, [actualDisplay])
    

    const noMessages = () => {
        return (
            <div className="flex flex-col items-center text-white justify-center h-screen">
                <WelcomeImg></WelcomeImg>
                <h2>HI NOMRE APELLIDO - USERNAME</h2>
                <p>Choose a friend to start chatting :)</p>
            </div>
        )
    }

    const getMessages = () => {
        return (
            <>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
                <Message></Message>
            </>
        )
    }

  return (
    <div className="flex flex-col items-center w-full h-[300px] md:flex overflow-y-auto md:h-screen ">
    
    {
        messagesExist 
        ? getMessages()
        : noMessages()
    }

</div>
  )
}

export default Conversation