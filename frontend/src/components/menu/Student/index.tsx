import React, { Component } from "react";
import { Button, Col, Row } from "antd";
import { UserContext } from "../../../index";
import NamePlate from "../../../containers/NamePlate";
import "../style.scss";
import "./style.scss";
import RoomNumberTag from "../../../containers/RoomNumberTag";
import AskQuestion from "../../../containers/AskQuestion";
import QueuePosition from "../../../containers/QueuePosition";
import RoomAssignment from "../../../containers/RoomAssignment";


export default class StudentMenu extends Component<any, any> {

  render(): React.ReactNode {
    return (
      <div id={"menu"} className={"student"}>
        <Row justify={"end"}>
          <Col xs={24} md={18}>
            <h1>Hey, <NamePlate />!</h1>
            <span className={"room-number"}>You are in group <RoomNumberTag /></span>
          </Col>
        </Row>

        <div className={"actions"}>
          <Row>
            <Col xs={24} md={6} className={"room"}>
              <RoomAssignment />
            </Col>

            <Col xs={24} md={18} className={"assistance"}>
              <div className={"logout"}>
                <UserContext.Consumer>
                  { consumer => (
                    <Button onClick={() => { localStorage.clear(); consumer.identify("", -1); }}>
                      Log out
                    </Button>
                  )}
                </UserContext.Consumer>
              </div>

              <UserContext.Consumer>
                { consumer => consumer.question > 0 ?
                  <QueuePosition question_id={consumer.question} /> :
                  <AskQuestion />
                }
              </UserContext.Consumer>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}