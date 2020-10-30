import React, { PureComponent } from "react";
import {UserContext} from "../../index";

export default class RoomNumberTag extends PureComponent {
  render(): React.ReactNode {
    return (
      <UserContext.Consumer>
        { consumer => consumer.room }
      </UserContext.Consumer>
    )
  }
}