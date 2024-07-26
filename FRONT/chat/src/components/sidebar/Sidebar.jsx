import { useDisplayValue } from "../../pages/home/context/DisplayModeContext";
import ContactList from "./ContactList";
import Logout from "./Logout";
import Search from "./Search";

const Sidebar = () => {
    const actualDisplay = useDisplayValue()  
  return (actualDisplay==="CONTACT" || actualDisplay==="BOTH") && (
    <div
      id="sideBar"
      className="flex flex-col items-center w-full h-screen md:w-1/4 md:border-r-2 border-rose-400 py-2"
    >
      <Search></Search>
      <div className="divider border-b-2 border-rose-400"></div>
      <h2 className="font-thin">ContactList</h2>
      <ContactList></ContactList>
      <Logout />
    </div>
  )
};

export default Sidebar;
