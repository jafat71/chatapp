import { useDisplayDispatch, useDisplayValue } from "../../pages/home/context/DisplayModeContext";
import useContact from "../../zustand/useContact";
import BackIcon from "./BackIcon";
import Conversation from "./Conversation";
import MessageInput from "./MessageInput";

const Panel = () => {
  const {selectedContact} = useContact()

  const dispatchDisplay = useDisplayDispatch()
  const handleClick = () => {
    (!window.matchMedia("(min-width: 768px)").matches) && dispatchDisplay({ type: "CONTACT" })
  };
  const actualDisplay = useDisplayValue()  

  return (actualDisplay==="CHAT" || actualDisplay==="BOTH") && (
    <div  id="panel" className="w-full md:flex md:w-3/4 flex-col items-center justify-between h-screen">
      <div className="flex flex-row gap-3 bg-red-200 w-full h-[30px] items-center text-black border-b-2 border-rose-300 p-2 rounded-md">
        
        <button onClick={handleClick}>
            <BackIcon></BackIcon>
        </button>
        
        <h1>{selectedContact ? selectedContact.fullname: ""}</h1>
      </div>

      <Conversation></Conversation>

      <MessageInput></MessageInput>
      
    </div>
  ) 
};

export default Panel;
