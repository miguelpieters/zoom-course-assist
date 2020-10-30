import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import StudentApp from "./apps/StudentApp";
import AdminApp from "./apps/AdminApp";


export default class PrimaryApp extends Component {

  render(): React.ReactNode {
    return (
      <Router>
        <Switch>
          <Route path="/admin">
            <AdminApp />
          </Route>
          <Route exact path="/">
            <StudentApp />
          </Route>
        </Switch>
      </Router>
    )
  }
}