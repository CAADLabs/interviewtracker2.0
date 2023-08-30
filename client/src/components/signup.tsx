import React from "react";
import { useState } from "react";
import { User } from "../../../types";
import { useNavigate } from "react-router-dom";

const Signup = ()  => {
  // const [newUser, setnewUser] = useState<User>({
  //   username: '',
  //   password: '',
  //   firstName: '',
  //   lastName: '',
  // });
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
 
  const navigate = useNavigate();
 

  //expected either response from back:
  //username is taken
  //User created

const handleSubmit = async (e:any) => {
  e.preventDefault();
  try{
    const response = await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // newUser: newUser,
        username,
        password,
        firstName,
        lastName
      }),
    })
    if (response.status === 201){
      navigate('/')
    } else {
      alert('username is taken!')
    }

  } catch(error:any){
    console.log(error)
  }
}

return (

<form onSubmit={handleSubmit}>
<label>Username</label>
<input
  type="text"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
<label>Password</label>
<input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value )}
/>
<label>First Name</label>
<input
  type="text"
  value={firstName}
  onChange={(e) => setFirstName(e.target.value )}
/>
<label>Last Name</label>
<input
  type="text"
  value={lastName}
  onChange={(e) => setLastName(e.target.value )}
/>
<button type="submit">Submit</button>
</form>
);

};


export default Signup;