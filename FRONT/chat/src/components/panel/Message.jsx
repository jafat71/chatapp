/* eslint-disable react/prop-types */

import { useAuthUserValue } from "../../context/AuthContext";
import { extractTime } from "../../services/extractTime";
import useContact from "../../zustand/useContact";

/* eslint-disable no-unused-vars */
const Message = ({message}) => {
  const user = useAuthUserValue()
  const {selectedContact} = useContact()

  const fromMe = message.senderId === user.userLogged._id
  const chatClassName = fromMe ? 'chat-end':'chat-start';
  const profilePic = fromMe ? user.userLogged.profilePic:selectedContact?.profilePic;
  const bubbleColor = fromMe ? 'chat-bubble-primary' : 'chat-bubble-secondary' 
  const userName = fromMe ? user.userLogged.fullname: selectedContact?.fullname
  const dateFormatted = extractTime(message.createdAt)
  const shakeClass = message.shouldShake ? 'shake' : ''
  return (
    <div className={`chat ${chatClassName} w-full p-2`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic}
          />
        </div>
      </div>
      <div className="chat-header">
        {userName}
      </div>
      <div className={`chat-bubble ${bubbleColor} ${shakeClass}`}>{message.message}</div>
      <div className="chat-footer">
      <time className="text-xs opacity-50 py-1">{dateFormatted}</time>
      </div>

    </div>
  );
};

export default Message;
