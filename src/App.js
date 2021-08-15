import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import { axiosWithAuth } from "./helpers/axiosWithAuth";
import "./styles.scss";

function App() {

  const handleSubmit = (e) => {
    axiosWithAuth()
      .post("/logout")
      .then(res => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch(err => {
        console.log("user must be logged-in to logout:", err);
      })

  }

  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <a data-testid="logoutButton" onClick={handleSubmit} href="#">logout</a>
        </header>
      <Switch>
        <PrivateRoute exact path="/bubbles" component={BubblePage} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Login} />
      </Switch>
      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Add in two routes that link to the Login Component, one for the default path '/' and one for the '/login'.
//2. Render BubblePage as a PrivateRoute
//2. Build the logout button to call the logout endpoint, remove the localStorage Item and redirect to the login page.