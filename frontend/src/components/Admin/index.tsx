import React, { Component } from "react";
import { IState } from "./types";
import Authentication from "../../containers/Authentication";
import { AdminContext } from "../../index";
import {Route} from "react-router-dom";
import AdminDashboard from "./Dashboard";
import "./style.scss";
import AdminAssistance from "./Assistance";

export default class Admin extends Component<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  render(): React.ReactNode {

    return (
      <AdminContext.Consumer>
        { consumer => consumer.token.length > 0 || (localStorage.getItem("token") || "").length > 0 ?
          <>
            <Route exact path="/admin/:question_id">
              <AdminAssistance />
            </Route>
            <Route exact path="/admin">
              <AdminDashboard consumer={consumer} />
            </Route>
          </> :
          <div id={"authentication"}>
            <h1>Who are you?</h1>
            <Authentication consumer={consumer} />
          </div>
        }
      </AdminContext.Consumer>
    );
  }
}