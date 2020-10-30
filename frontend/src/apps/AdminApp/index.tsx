import React, { Component } from "react";
import { AdminContext } from "../..";
import Admin from "../../components/Admin";
import {Route, Switch} from "react-router-dom";

interface IContext {
  token: string;
  setToken: (token: string) => any
}

interface IState {
  initializing: boolean;
  authorized: boolean;
  context: IContext;
}


export default class AdminApp extends Component<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      initializing: true,
      authorized: false,
      context: {
        token: "",
        setToken: (token: string) => this.updateContext("token", token),
      },
    }
  }

  updateContext = async (key: "token", value: any) => {
    await this.setState({context: {...this.state.context, [key]: value}});
  }

  render(): React.ReactNode {
    return (
      <AdminContext.Provider value={this.state.context}>
        <Admin />
      </AdminContext.Provider>
    );
  }
}