/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { liveReducer } from "./liveReducer";

const LiveContext = createContext();

export const LiveContextProvider = (props) => {
  const [liveMessagesValue, dispatchLiveMessage] = useReducer(liveReducer, "UNSET");
  return (
    <LiveContext.Provider value={[liveMessagesValue, dispatchLiveMessage]}>
      {props.children}
    </LiveContext.Provider>
  );
};


export const useLiveMessageValue = () => {
  const fullContext = useContext(LiveContext);
  return fullContext[0];
};

export const useLiveMessageDispatch = () => {
  const fullContext = useContext(LiveContext);
  return fullContext[1];
};
