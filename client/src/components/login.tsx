import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  userContext
} from '../../App'



const Login: React.FC = () => {
  // const [username, setusername] = useState<String>("");
  const { username, setusername }: any = useContext(userContext);
  const [password, setpassword] = useState<String>("");
  const [loggedIn, setloggedIn] = useState<Boolean>(false);


  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          username: username,
        }),
      });
      if (response.status === 201) {
        setloggedIn(true);
        navigate("/main");
      } else {
        alert("Username or Password is incorrect!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginDiv">
      <div className="formDiv">
        <h2>LOGIN</h2>
        <input
          className="username"
          type="text"
          placeholder="enter username"
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          className="password"
          type="text"
          placeholder="enter password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button className="login" type="button" onClick={login}>
          {" "}
          Login{" "}
        </button>
        <button
          className="signup"
          type="button"
          onClick={() => navigate("/signup")}
        >
          {" "}
          Sign Up{" "}
        </button>
      </div>
    </div>
  );
};

export default Login;
