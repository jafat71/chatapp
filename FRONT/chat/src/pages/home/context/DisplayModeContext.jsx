/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { displayReducer } from "./displayReducer";

const DisplayModeContext = createContext();

export const DisplayModeContextProvider = (props) => {
  const [display, dispatchDisplay] = useReducer(displayReducer, "CONTACT");
  return (
    <DisplayModeContext.Provider value={[display, dispatchDisplay]}>
      {props.children}
    </DisplayModeContext.Provider>
  );
};


export const useDisplayValue = () => {
  const fullContext = useContext(DisplayModeContext);
  return fullContext[0];
};

export const useDisplayDispatch = () => {
  const fullContext = useContext(DisplayModeContext);
  return fullContext[1];
};
