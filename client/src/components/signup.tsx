import React from "react";
import { useState } from "react";
import { User } from "../../../types";
import { useNavigate } from "react-router-dom";

const Signup = ()  => {
  const [newUser, setnewUser] = useState<User>({
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
 
  const navigate = useNavigate();


  //expected either response from back:
  //username is taken
  //User created

const handleSubmit = () => {
  fetch('/api/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newUser: newUser,
    }),
  })
  .then((data) => {
    alert("Account Successfully Created! Please Login")
    navigate('/')
  })
  .catch((error) => {
    alert("Either your username or password were incorrect")
  })
}


return (

<form onSubmit={handleSubmit}>
<label>Username</label>
<input
  type="text"
  value={newUser.username}
  onChange={(e) => setnewUser({ ...newUser, username: e.target.value })}
/>
<label>Password</label>
<input
  type="password"
  value={newUser.password}
  onChange={(e) => setnewUser({ ...newUser, password: e.target.value })}
/>
<label>First Name</label>
<input
  type="text"
  value={newUser.firstName}
  onChange={(e) => setnewUser({ ...newUser, firstName: e.target.value })}
/>
<label>Last Name</label>
<input
  type="text"
  value={newUser.lastName}
  onChange={(e) => setnewUser({ ...newUser, lastName: e.target.value })}
/>
<button type="submit">Submit</button>
</form>
);

};


export default Signup;