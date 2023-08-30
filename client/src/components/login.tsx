import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Login: React.FC = () => {
  const [username, setusername] = useState<String>('')
  const [password, setpassword] = useState<String>('')
  const [loggedIn, setloggedIn] = useState<Boolean>(false)

  const navigate = useNavigate();

  const click = () => {
    fetch('/api/authenticate', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password:password,
        username:username
      }),
    })
    .then((data) => {
      setloggedIn(true)
      alert("You're successfully logged in!")
    })
    .catch((error) => {
      alert("Either your username or password were incorrect")
    })
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/main")
    }
  }, [loggedIn])

  return (
    <div className='loginDiv'>
      <input type='text' placeholder='enter username' onChange={(e) => setusername(e.target.value)}/>
      <input type='text' placeholder='enter password' onChange={(e) => setpassword(e.target.value)}/>
      <button type='button' onClick={click}> Login </button>
    </div>
  )
}


export default Login;