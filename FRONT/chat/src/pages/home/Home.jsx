import { useEffect } from "react";
import Panel from "../../components/panel/Panel"
import Sidebar from "../../components/sidebar/Sidebar"
import {useDisplayDispatch } from "./context/DisplayModeContext";
import useContact from "../../zustand/useContact";

const Home = () => {

  const dispatchDisplay = useDisplayDispatch()
  const {setSelectedContact} = useContact()
  useEffect(() => {
    const handleResize = () => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      if (isMd) {
        dispatchDisplay({ type: "BOTH" })
      } else {
        dispatchDisplay({ type: "CONTACT" })
      }
    };

    handleResize()
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    return () => {
      setSelectedContact(null)
    };
  }, []);


  return (
    <>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center bg-base-100 rounded-lg text-white w-full md:w-3/4 ">
        <Sidebar></Sidebar>
        <Panel></Panel>
    </div>
    </>

  )
}

export default Home
