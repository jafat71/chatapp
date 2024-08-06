/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { liveReducer } from "./liveReducer";
import { actualContactReducer } from "./actualContactReducer";

const LiveContext = createContext();

export const LiveContextProvider = (props) => {
  const [liveMessagesValue, dispatchLiveMessage] = useReducer(liveReducer, "UNSET");
  const [actualContactValue, dispatchActualContact] = useReducer(actualContactReducer, "UNSET");

  return (
    <LiveContext.Provider value={[
      liveMessagesValue, 
      dispatchLiveMessage,
      actualContactValue,
      dispatchActualContact]}>
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

export const useActualContactValue = () => {
  const fullContext = useContext(LiveContext);
  return fullContext[0];
};

export const useActualCOntactDispatch = () => {
  const fullContext = useContext(LiveContext);
  return fullContext[1];
};
