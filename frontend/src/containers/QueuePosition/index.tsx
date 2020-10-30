import React, { PureComponent } from "react";
import {Badge, Col, notification, Row, Statistic, Tag} from "antd";
import { HourglassOutlined } from '@ant-design/icons';
import {IProps, IState} from "./types";
import Questions from "../../api/questions";
import moment from "moment";
import {AxiosResponse} from "axios";
import Queue from "../../models/Queue";
import {UserContext} from "../../index";

export default class QueuePosition extends PureComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      gif: this.getSuitableGif(100),
      queue_data: null,
      is_closed: false
    };
  }

  componentDidMount(): void {
    const { question_id } = this.props;
    Questions.getQueue(question_id).then((response) => {
      this.setState({queue_data: response.data});
    });

    setInterval(() =>
      this.setState({
        gif: this.getSuitableGif(this.state.queue_data?.position || 100)
      }), 10 * 1000);

    const that = this;
    setInterval(() => {
      Questions.getQueue(question_id).then((response: AxiosResponse<Queue>) => {
        that.setState({queue_data: response.data});

        if (response.data.question.status !== "open" && !this.state.is_closed) {
          this.setState({queue_data: null, is_closed: true}, () => that.forceUpdate());
        }
      });
    }, 5 * 1000);
  }

  getSuitableGif = (positionInLine: number): string => {
    let suitable: string[] = [];

    if (positionInLine === 1) {
      suitable = [
        "https://media4.giphy.com/media/VEzlrMWk3F7uuFuRSq/giphy.gif?cid=ecf05e47xeikdh04zuqwbl9itk5im63ml9jerhumt3fvo4ef&rid=giphy.gif",
        "https://media0.giphy.com/media/Jn3fqI2I0m5cB2L8g6/200.gif?cid=ecf05e47408752fb23635af4a0f4c163039add8c55c44a21&rid=200.gif"
      ]
    }

    if (suitable.length === 0) {
      suitable = [
        "https://media1.giphy.com/media/273P92MBOqLiU/100.gif?cid=ecf05e47z1p52shxfz1nxjvef70eqcpj2wmbttwd05k36w9w&rid=100.gif",
        "https://media3.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy.gif?cid=ecf05e4773sv3mrio1aemdgmurzu9lsl0gsavp96g118i3ye&rid=giphy.gif",
        "https://media2.giphy.com/media/4NnTap3gOhhlik1YEw/200w.gif?cid=ecf05e47mp7y7x5ofwuj5wjnvx2hg950qixkuezcikfssryh&rid=200w.gif",
        "https://media0.giphy.com/media/c0Z8KKDlEZfkQ/giphy.gif?cid=ecf05e47g3c4jjc8lhtizfg9sxynfh5i8uscfr53eh4e9oag&rid=giphy.gif",
        "https://media3.giphy.com/media/CjmvTCZf2U3p09Cn0h/200.gif?cid=ecf05e4773sv3mrio1aemdgmurzu9lsl0gsavp96g118i3ye&rid=200.gif",
        "https://media3.giphy.com/media/lP4jmO461gq9uLzzYc/200w.gif?cid=ecf05e47mp7y7x5ofwuj5wjnvx2hg950qixkuezcikfssryh&rid=200w.gif",
        "https://media3.giphy.com/media/u5eXlkXWkrITm/200w.gif?cid=ecf05e47qgvmxeodetri0q6abxzkrrgkq5go4ph7wf9hpf0e&rid=200w.gif"
      ]
    }

    return suitable[Math.floor(Math.random() * suitable.length)];
  }

  renderWaiting = () => {
    const { queue_data } = this.state;
    if (!queue_data) return null;

    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Statistic
              title={"Position"}
              value={`#${ queue_data.position + 1 }`}
              prefix={<HourglassOutlined />}
              suffix={"in line"}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title={"Asked"}
              value={moment(queue_data.question.created_at, "YYYY-MM-DD HH:mm Z").fromNow()}
            />
          </Col>
          <Col span={8}>
            <Statistic title={"Status"} value={" "} prefix={<Badge status={"processing"} text={queue_data.question.status} />} />
          </Col>
        </Row>
        <br />
        <span>It's advisable that you keep this tab open. Your request has been saved and registered, our TA's are doing their very best to be with you shortly! </span>
        <br />
        <small>You asked:</small>
        <h3>{ queue_data.question.content }</h3>
        <br />
        <img src={this.state.gif} style={{maxHeight: 200}} />
      </div>
    )
  }

  renderYourTurn = () => {
    return (
      <div>
        <h2>The waiting is over!</h2>
        <span>{ this.state.queue_data?.question.claimed_by?.first_name } is on his way to help you out!</span>
        <br />
        <br />
        <img src={"https://media1.giphy.com/media/3o7btWMurfV7OeRBpC/200w.gif?cid=ecf05e478xz4t4ed4r1xhwrqjd41wn54iyg6amaqz4gfb9hq&rid=200w.gif"} />
      </div>
    )
  }

  render(): React.ReactNode {
    const { queue_data, is_closed } = this.state;
    if (is_closed) {
      return (
        <UserContext.Consumer>
          { consumer => {
            consumer.setQuestion(0);
            notification.open({
              message: 'Question closed',
              description: 'The question has been closed, if you have more questions request assistance again!',
            });
            return null;
          }}
        </UserContext.Consumer>
      );
    }

    if (!queue_data) return null;

    return !queue_data.question.claimed_by ? this.renderWaiting() : this.renderYourTurn();
  }
}