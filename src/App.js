import React, { useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import LoginRegister from "./component/LoginRegister";
import Dashboard from "./component/dashboard";
function App() {
  

  return (
    <Router>
    <div>
   
      <Switch>
        <Route exact path="/">
          <LoginRegister />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        
      </Switch>
    </div>
  </Router>
 );
}

function LoginForm() {
  return (
    <React.Fragment>
      <label for="username">USERNAME</label>
      <input type="text" id="username" />
      <label for="password">PASSWORD</label>
      <input type="text" id="password" />
      <input type="submit" value="submit" className="submit" />
    </React.Fragment>
  );
}

function RegisterForm() {
  return (
    <React.Fragment>
      <label for="fullname">full name</label>
      <input type="text" id="fullname" />
      <label for="email">email</label>
      <input type="text" id="email" />
      <label for="password">password</label>
      <input type="text" id="password" />
      <label for="confirmpassword">confirm password</label>
      <input type="text" id="confirmpassword" />
      <input type="submit" value="submit" class="submit" />
    </React.Fragment>
  );
}

export default App;