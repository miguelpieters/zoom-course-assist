import React, {ChangeEvent, Component} from "react";
import { IProps, IState } from "./types";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import "./style.scss";
import { UserContext } from "../..";
const emoji = require('node-emoji');

export default class Authorization extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    const emojis = ["wave", "yum", "boom", "v"];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    this.state = {
      mounted: false,
      name: null,
      group: null,
      icon: randomEmoji
    }
  }

  componentDidMount(): void {
    setTimeout(() => {
      this.setState({mounted: true});
    }, 500)
  }

  render(): React.ReactNode {
    const { mounted, name, group, icon } = this.state;

    return (
      <div id={"authorization"}>
        <div className={"wrapper"}>
          <div className={"inner"}>
            <h1>Hello, please introduce yourself so that we can reach you {emoji.get(`:${icon}:`)}</h1>

            <div className={`form ${mounted && 'active'}`}>
              <Form
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={() => {}}
              >
                <Form.Item
                  name="username"
                  className={"username"}
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder={"My name is..."}
                    onChange={(elem: ChangeEvent<HTMLInputElement>) =>
                      this.setState({name: elem.target.value})}
                  />
                </Form.Item>
                <Form.Item
                  className={"password"}
                  name="password"
                  rules={[{ required: true, message: 'Please input your room number!' }]}
                >
                  <Input
                    prefix={<TeamOutlined />}
                    type={"number"}
                    placeholder={"My room number is..."}
                    onChange={(elem: ChangeEvent<HTMLInputElement>) =>
                      this.setState({group: parseInt(elem.target.value)})}
                  />
                </Form.Item>

                <Form.Item className={"sign-in"}>
                  <UserContext.Consumer>
                    { consumer => (
                      <Button
                        type={"primary"}
                        htmlType={"submit"}
                        className={"login-form-button"}
                        disabled={!name || !group}
                        onClick={() => {
                          const formatted_name = name ? name.charAt(0).toUpperCase() + name.slice(1) : "";
                          consumer.identify(formatted_name, group || -1);
                        }}
                      >
                        Sign in
                      </Button>
                    )}
                  </UserContext.Consumer>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

        <div className={"footer"}>
          <span>
            Created by <a href={"https://www.linkedin.com/in/miguelepieters/"} target={"_blank"}>Miguel</a>
            &nbsp; - &nbsp;freely available on GitHub</span>
        </div>
      </div>
    );
  }
}