import React, { PureComponent } from "react";
import {Alert, Button, message} from "antd";
import { UserContext } from "../../index";
import {IState} from "./types";
import Questions from "../../api/questions";

export default class RoomAssignment extends PureComponent<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      show_alert: false,
    };
  }

  sendRequest = (requester: string, room: number) => {
    Questions.ask(requester, room, "room_assignment", room.toString()).then(() => {
      this.setState({ show_alert: true });
    }).catch(() => message.error("Failed to send request!"));
  }

  render(): React.ReactNode {
    const { show_alert } = this.state;

    return (
      <UserContext.Consumer>
        { consumer => (
          <div>
            <h2>Troubles entering room?</h2>
            <p>Click the button below.</p>
            <Button type={"primary"} onClick={() => this.sendRequest(consumer.user, consumer.room)}>
              Send me to my room
            </Button>
            <br /><br />

            { show_alert && (
              <Alert
                style={{width: '95%'}}
                message={"We have received your request successfully!"}
                type={"info"}
                closable
                onClose={ () => this.setState({show_alert: false}) }
              />
            )}
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}