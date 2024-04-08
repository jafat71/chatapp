import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast"
import { DisplayModeContextProvider } from "./pages/home/context/DisplayModeContext";
import { useAuthUserValue } from "./context/AuthContext";
function App() {
  const user = useAuthUserValue()
  return (
    <div className="max-w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-pink-500">
      <Routes>
        <Route path="/home" element={
          !user ?
            <Navigate to="/login" />
            :
            <DisplayModeContextProvider>
              <Home></Home>
            </DisplayModeContextProvider>
        }></Route>
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login></Login>}></Route>
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup></Signup>}></Route>
        <Route path="/*" element={<Login></Login>}></Route>

      </Routes>
      <Toaster />

    </div>
  );
}

export default App;
