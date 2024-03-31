import { useEffect, useState } from "react";
import "./App.css";
import { useDisplayDispatch, useDisplayValue } from "./GlobalContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

function App() {
  const display = useDisplayValue();
  return (
    <div className="max-w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-500 to-pink-500">
      {/* <Login></Login> */}
      {/* <Signup></Signup> */}

      <Home></Home>
    </div>
  );
}

export default App;
