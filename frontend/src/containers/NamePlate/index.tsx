import React, { PureComponent } from "react";
import {UserContext} from "../../index";

export default class NamePlate extends PureComponent {
  render(): React.ReactNode {
    return (
      <UserContext.Consumer>
        { consumer => consumer.user }
      </UserContext.Consumer>
    )
  }
}