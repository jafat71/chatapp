import { useState } from "react";
import { useSendMessage } from "../../hooks/useSendMessage";
import useContact from "../../zustand/useContact";
import { IoSend } from "react-icons/io5";
const MessageInput = () => {
  const {selectedContact} = useContact()
  const [message, setMessage] = useState("")
  const [ loading,
    sendMessageTo] = useSendMessage();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) return
    await sendMessageTo({message})
    setMessage("")
  }


  return (
    <div className="max-x-auto justify-center w-full">
      <form className="flex flex-row items-center justify-between gap-2 px-4 my-3 w-full" onSubmit={handleSubmit}>
        <input 
        disabled={!selectedContact} 
        type="text" 
        className="w-full bg-gray-200 rounded-md outline-none p-1 text-black focus:ring-2 focus:ring-rose-500" placeholder="Send a message"
        value={message}
        onChange={(e)=>setMessage(e.target.value)}
        ></input>
        <button disabled={!selectedContact} className="bg-rose-500 rounded-full px-2 py-2 w-[30px] h-[30px] hover:bg-gray-200 hover:text-black transition-all duration-200">
          {loading ? <span className="loading loading-spinner w-3 flex items-center"></span> : <IoSend/>}
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
