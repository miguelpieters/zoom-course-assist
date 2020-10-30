import React, { PureComponent } from "react";
import {IProps, IState} from "./types";
import { Table, message, Button} from "antd";
import Questions from "../../../api/questions";
import Question from "../../../models/Question";

export default class RoomsTable extends PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      closable_questions: []
    };
  }

  rowSelection = () => {
    return {
      onChange: (selectedRowKeys: any, selectedRows: any) => {
        this.setState({ closable_questions: selectedRows })
      },
    };
  }

  closeRequests = () => {
    const { closable_questions } = this.state;

    closable_questions.forEach((question: Question, index: number) => {

      Questions.closeQuestion(question.id).catch(() =>
        message.error(`Failed to complete room direct for ${question.requester}`));

      if (index === closable_questions.length - 1) {
        this.props.pollData(() => message.success("Completed closing selected room redirects!"));
      }
    })
  }

  render(): React.ReactNode {
    return (
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...this.rowSelection(),
          }}
          dataSource={(this.props.questions || []).map((elem, idx) => ({...elem, key: idx + 1}))}
        >
          <Table.Column
            title={"Student"}
            dataIndex={"requester"}
            key={"requester"}
          />
          <Table.Column title={"Room"} dataIndex={"room"} key={"room"} />
        </Table>
        <br />
        <Button type={"primary"} onClick={this.closeRequests}>
          Mark selected done
        </Button>
      </div>
    )
  }
}