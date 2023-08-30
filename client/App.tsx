import React from "react";
import { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./src/components/login";
import Main from "./src/components/main";
import Signup from "./src/components/signup";

export const userContext = createContext<
  | {
      username: String;
      setusername: React.Dispatch<React.SetStateAction<String>>;
    }
  | undefined
>(undefined);

const App: React.FC = () => {
  const [username, setusername] = useState<String>("");
  return (
    <div className="app">
      <userContext.Provider value={{ username, setusername }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </userContext.Provider>
      {/* <h1>Best Interview Tracker Ever </h1> */}
    </div>
  );
};

export default App;
