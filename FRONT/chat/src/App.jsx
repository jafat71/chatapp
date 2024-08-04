import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"
import { DisplayModeContextProvider } from "./pages/home/context/DisplayModeContext";
import { useAuthUserValue } from "./context/AuthContext";
import { useEffect } from "react";
import { LiveContextProvider } from "./pages/home/context/LiveContext";
import Reset from "./pages/reset/Reset";
function App() {
  const user = useAuthUserValue()
  
  useEffect(() => {
    if (user) {
      toast("User logged :)")
    }
  }, [user]);

  return (
    <div className="max-w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-pink-500">
      <Routes>
        <Route path="/home" element={
          !user ?
            <Navigate to="/login" />
            :
            <DisplayModeContextProvider>
              <LiveContextProvider>
                <Home></Home>
              </LiveContextProvider>
            </DisplayModeContextProvider>
        }></Route>
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login></Login>}></Route>
        <Route path="/reset" element={user ? <Navigate to="/home" /> : <Reset></Reset>}></Route>
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup></Signup>}></Route>
        <Route path="/*" element={<Navigate to="/home" />}></Route>

      </Routes>
      <Toaster />

    </div>
  );
}

export default App;
