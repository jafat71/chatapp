/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";
import { displayReducer } from "./displayReducer";

const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [display, dispatchDisplay] = useReducer(displayReducer, "CONTACT");

  return (
    <GlobalContext.Provider value={[display, dispatchDisplay]}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useDisplayValue = () => {
  const fullContext = useContext(GlobalContext);
  return fullContext[0];
};

export const useDisplayDispatch = () => {
  const fullContext = useContext(GlobalContext);
  return fullContext[1];
};
