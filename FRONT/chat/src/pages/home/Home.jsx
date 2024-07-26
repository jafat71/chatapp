import { useEffect } from "react";
import Panel from "../../components/panel/Panel"
import Sidebar from "../../components/sidebar/Sidebar"
import {useDisplayDispatch, useDisplayValue } from "./context/DisplayModeContext";
import useContact from "../../zustand/useContact";

const Home = () => {

  const dispatchDisplay = useDisplayDispatch();
  const display = useDisplayValue();
  const { setSelectedContact } = useContact();

  useEffect(() => {
    let previousInnerHeight = window.innerHeight;

    const handleResize = () => {
      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const currentInnerHeight = window.innerHeight;

      if (Math.abs(currentInnerHeight - previousInnerHeight) > 100) {
        previousInnerHeight = currentInnerHeight;
        return;
      }

      if (isMd) {
        dispatchDisplay({ type: "BOTH" });
      } else {
        if (display === "BOTH" || display === "CONTACT") {
          dispatchDisplay({ type: "CONTACT" });
        } else if (display === "CHAT") {
          dispatchDisplay({ type: "CHAT" });
        }
      }

      previousInnerHeight = currentInnerHeight;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatchDisplay, display]);

  useEffect(() => {
    return () => {
      setSelectedContact(null);
    };
  }, [setSelectedContact]);

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
