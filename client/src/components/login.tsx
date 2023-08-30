import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Login: React.FC = () => {
  const [username, setusername] = useState<String>('')
  const [password, setpassword] = useState<String>('')
  const [loggedIn, setloggedIn] = useState<Boolean>(false)

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password:password,
          username:username
        }),
      })
        if (response.status === 201) {
          setloggedIn(true)
          navigate('/main')
        } else {
          alert("Username or Password is incorrect!")
        }
      
  } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className='loginDiv'>
      <input type='text' placeholder='enter username' onChange={(e) => setusername(e.target.value)}/>
      <input type='text' placeholder='enter password' onChange={(e) => setpassword(e.target.value)}/>
      <button type='button' onClick={login}> Login </button>
      <button type='button' onClick={() => navigate("/signup")}> Sign Up </button>
    </div>
  )
}


export default Login;