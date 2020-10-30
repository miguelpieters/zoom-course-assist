import React, { PureComponent } from "react";
import {Button, Col, Row} from "antd";
import "./style.scss";
import { Table } from 'antd';
import Questions from "../../api/questions";
import AssistanceTable from "./AssistanceTable";
import {IProps, IState} from "./types";
import RoomsTable from "./RoomsTable";

const columns = [
  {
    title: 'Name',
    dataIndex: 'requester',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Room',
    dataIndex: 'room',
  },
];
const data = [
  {
    key: '1',
    requester: 'John Brown',
    room: 32,
  },
  {
    key: '2',
    requester: 'Jim Green',
    room: 42,
  },
  {
    key: '3',
    requester: 'Joe Black',
    room: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    requester: 'Disabled User',
    room: 99,
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

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