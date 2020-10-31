import React, { PureComponent } from "react";
import { Col, Row } from "antd";
import Questions from "../../api/questions";
import AssistanceTable from "./AssistanceTable";
import {IProps, IState} from "./types";
import RoomsTable from "./RoomsTable";
import "./style.scss";

export default class QueueList extends PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      questions: []
    }
  }

  componentDidMount(): void {
    this.pollData();

    setInterval(() => this.pollData(), 2000);
  }

  pollData = (cls?: () => any) => {
    Questions.list().then(response => {
      this.setState({questions: response.data.results});
      cls && cls();
    });
  }

  render(): React.ReactNode {
    return (
      <Row gutter={[10, 10]} id={"queue-list"}>
        <Col xs={24} md={8}>
          <h2>Room Redirects</h2>
          <RoomsTable
            questions={this.state.questions?.filter(x => x.question_type === "room_assignment")}
            pollData={this.pollData}
          />
        </Col>

        <Col xs={24} md={16}>
          <h2>Assistance Requests</h2>
          <AssistanceTable
            pollData={this.pollData}
            questions={this.state.questions?.filter(x => x.question_type === "assistance") || undefined} />
        </Col>
      </Row>
    )
  }
}