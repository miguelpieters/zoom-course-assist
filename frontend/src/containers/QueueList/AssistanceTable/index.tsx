import React, { PureComponent } from "react";
import { IProps, IState } from "./types";
import {Space, Table, Popconfirm, Tooltip, message} from "antd";
import { QuestionCircleOutlined } from '@ant-design/icons';
import moment from "moment";
import Questions from "../../../api/questions";
import Question from "../../../models/Question";
import { Redirect } from "react-router-dom";

export default class AssistanceTable extends PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      claim: -1
    }

  }

  render(): React.ReactNode {
    const { claim } = this.state;

    if (claim > 0) return <Redirect to={`./hosts/${claim}`} />

    return (
      <Table
        dataSource={(this.props.questions || []).map((elem, idx) => ({...elem, key: idx + 1}))}
      >
        <Table.Column
          title={"Student"}
          dataIndex={"requester"}
          key={"requester"}
          render={(text, record: Question) => (
            <span>
              { text } &nbsp;
              <Tooltip title={record.content}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )}
        />
        <Table.Column title={"Room"} dataIndex={"room"} key={"room"} />
        <Table.Column
          title={"Requested at"}
          dataIndex={"created_at"}
          key={"created_at"}
          render={(text, record) => (
            moment(text, "YYYY-MM-DD HH:mm Z").fromNow()
          )}
        />
        <Table.Column
          title="Action"
          key="action"
          render={(text: string, record: Question) => (
            <Space size="middle">
              <a onClick={() => this.setState({claim: record.id})}>Take</a>
              <Popconfirm
                title={"Are you sure?"}
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={() => {
                  Questions.closeQuestion(record.id).then(() => {
                    this.props.pollData(() => message.success("Question was removed from list"));
                  });
                }}
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          )}
        />
      </Table>
    )
  }
}