import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./features/routing/PrivateRoute";
import Alert from "./features/alert/Alert";
import Landing from "./features/landing/Landing";
import Login from "./features/login/Login";
import Register from "./features/register/Register";
import "./sass/main.scss";
import Dashboard from "./features/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Alert />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
