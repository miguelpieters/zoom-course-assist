import React, { Component } from "react";
import {getLatestQuestion, getLoggedInUser, getUserRoom} from "../../utils/store";
import { UserContext } from "../..";
import StudentMenu from "../../components/menu/Student";
import Authorization from "../../components/Authoriation";

interface IContext {
  user: string;
  room: number;
  question: number; // <- id of the question
  identify: (name: string, room: number) => any,
  setQuestion: (question: number) => any
}

interface IState {
  initializing: boolean;
  authorized: boolean;
  context: IContext;
}


export default class StudentApp extends Component<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      initializing: true,
      authorized: false,
      context: {
        user: "",
        room: -1,
        question: -1,
        identify: (name: string, room: number) => this.identify(name, room),
        setQuestion: (question: number) => this.updateQuestion(question),
      },
    }
  }

  async componentDidMount(): Promise<void> {
    await this.updateContext("user", getLoggedInUser() || "");
    await this.updateContext("room", parseInt(getUserRoom() || "-1"));
    await this.updateContext("question", parseInt(getLatestQuestion() || "-1"));
    this.setState({ initializing: false });
  }

  updateQuestion = (question: number) => {
    this.setState({context: {...this.state.context, question}});
  }

  identify = (name: string, room: number) => {
    localStorage.setItem("user", name);
    localStorage.setItem("room", room.toString());
    this.setState({ context: {...this.state.context, ...{user: name, room}}});
  }

  updateContext = async (key: "user" | "room" | "question", value: any) => {
    localStorage.setItem(key, `${value}`);
    await this.setState({context: {...this.state.context, [key]: value}});
  }

  render(): React.ReactNode {
    const { initializing, context } = this.state;

    if (initializing) {
      return <p>One moment please!</p>
    }

    const authorized = context.user.length > 0 && context.room >= 0;

    return (
      <UserContext.Provider value={this.state.context}>
        { authorized ? <StudentMenu /> : <Authorization /> }
      </UserContext.Provider>
    );
  }
}