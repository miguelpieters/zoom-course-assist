import React, { PureComponent } from "react";
import {Button, Popconfirm} from "antd";
import QueueList from "../../../containers/QueueList";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { IProps } from "./types";


export default class AdminDashboard extends PureComponent<IProps > {

  constructor(props: IProps) {
    super(props);

    this.state = {
      claim: -1
    };
  }

  render(): React.ReactNode {
    const { consumer } = this.props;

    return (
      <div>
        <div style={{padding: 20}}>
          <h2>Admin dashboard</h2>
          <Button type={"dashed"} onClick={() => { consumer.setToken(""); localStorage.clear() }}>
            Log out
          </Button> &nbsp;
          <Popconfirm
            title={"Are you sure?"}
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button danger>
              Close all questions
            </Button>
          </Popconfirm>
        </div>
        <QueueList />
      </div>
    );
  }
}