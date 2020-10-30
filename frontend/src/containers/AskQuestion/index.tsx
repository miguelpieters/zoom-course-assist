import React, {ChangeEvent, PureComponent} from "react";
import {Button, Form, Input, message} from "antd";
import {UserContext} from "../../index";
import {IState} from "./types";
import Questions from "../../api/questions";

const { TextArea } = Input;


export default class AskQuestion extends PureComponent<{}, IState> {

  constructor(props: {}) {
    super(props);

    this.state = {
      content: ""
    };
  }

  sendRequest = (requester: string, room: number, content: string, consumer: any) => {
    message.loading({ content: 'Sending request...', 'key': 'abc' });
    Questions.ask(requester, room, "assistance", content).then((response) => {
      setTimeout(() => {
        consumer.setQuestion(response.data.id);
        message.success({ content: 'We received your request!', 'key': 'abc', duration: 2 });
      }, 300);
    }).catch(() => {
      message.error({ content: 'Failed to send request!', 'key': 'abc' });
    });
  };

  render(): React.ReactNode {
    return (
      <UserContext.Consumer>
        { consumer => (
          <div>
            <h2>Request assistance.</h2>
            <p>What's your question? We'll be with you as soon as possible!</p>
            <>
              <Form.Item>
                <TextArea
                  placeholder={"Type your question here"}
                  rows={4}
                  onChange={(evt: ChangeEvent<HTMLTextAreaElement>) =>
                    this.setState({content: evt.target.value})
                  } value={this.state.content} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" loading={false} onClick={() => {
                  this.sendRequest(consumer.user, consumer.room, this.state.content, consumer);
                }} type={"primary"} disabled={this.state.content.length < 1}>
                  Ask question
                </Button>
              </Form.Item>
            </>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}