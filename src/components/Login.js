import React, { useState } from "react";
import axios from 'axios';

const initialValues = {
  username: '',
  password: ''
};

const error = "";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState(initialValues);
  const [ loginError, setloginError ] = useState(error);

  const handleChange = (e) => {
    const inputName = e.target.name
    const inputValue = e.target.value
    setCredentials({
      ...credentials, [inputName]: inputValue
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:5000/api/login", credentials)
      .then(res => {
        localStorage.setItem("token", res.data.payload)
      })
      .catch(err => {
        console.log("login failed to authorize:", err)
        setloginError("Username or password invalid. Please verify credentials and try again!")
      })
  }

  
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Please login</h2>
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>login</button>
        </form>
      </div>

      <p id="error" className="error">{loginError}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"