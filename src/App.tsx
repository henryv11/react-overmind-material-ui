import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import RegistrationPage from "./pages/register";
import Welcome from "./pages/welcome";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Welcome />
        </Route>
        <Route path="/register">
          <RegistrationPage />
        </Route>
      </Switch>
    </Router>
  );
}
