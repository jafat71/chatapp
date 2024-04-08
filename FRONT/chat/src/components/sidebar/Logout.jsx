import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import LogoutIcon from "./LogoutIcon";

const Logout = () => {

  const [loading, setLoading] = useState(false)
  const [
    logout
  ] = useLogout()

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
  }

  return (
    <div className="mt-auto flex w-full px-2">
      {
        !loading ? (
          <div>
            <button 
            onClick={handleLogout}
            className="flex w-full transition-colors duration-300 ease-in-out hover:text-black p-1">
              <LogoutIcon></LogoutIcon>
            </button>
          </div>
        ) : (
          <span className="loading loading-spinner"></span>
        )

      }

    </div>
  );
};

export default Logout;
