import React from "react";
import { useState } from "react";
import { User } from "../../../types";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const navigate = useNavigate();

  //expected either response from back:
  //username is taken
  //User created

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // newUser: newUser,
          username,
          password,
          firstName,
          lastName,
        }),
      });
      if (response.status === 201) {
        navigate("/");
      } else {
        alert("username is taken!");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="bodyDiv">
      <div className="formDiv">
        <h2>SIGN UP</h2>
        <form onSubmit={handleSubmit}>
          {/* <label>Username</label> */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          {/* <label>Password</label> */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          {/* <label>First Name</label> */}
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          {/* <label>Last Name</label> */}
          <input
            id="lastname"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <button type="submit">Signup</button>
          <button
            className="login"
            type="button"
            onClick={() => navigate("/")}
          >
            Login Instead
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
