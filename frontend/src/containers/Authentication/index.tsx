import React, { PureComponent } from "react";
import {Form, Input, Button, Checkbox, message} from 'antd';
import {IProps, IState} from "./types";
import Authorize from "../../api/authorize";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Authentication extends PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  submitForm = () => {
    Authorize.authenticate(this.state.username, this.state.password).then((response) => {
      localStorage.setItem("token", response.data.token);
      this.props.consumer.setToken(response.data.token);
    }).catch(() => message.error({ content: 'NOPE!', duration: 5 }));
  }

  render(): React.ReactNode {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.submitForm}
        onFinishFailed={() => {}}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input onChange={(evt) => this.setState({ username: evt.target.value })}/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password onChange={(evt) => this.setState({ password: evt.target.value })}/>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={this.state.password.length === 0 || this.state.username.length === 0}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
