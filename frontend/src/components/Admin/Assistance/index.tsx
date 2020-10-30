import React, { PureComponent } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {IState} from "./types";
import {Badge, Descriptions, Spin, Button, Alert, message} from "antd";
import "./style.scss";
import Question from "../../../models/Question";
import {AxiosResponse} from "axios";
import Questions from "../../../api/questions";
import moment from "moment";


class AdminAssistance extends PureComponent<any, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      question: null,
      error: false,
      already_claimed: false,
      is_done: false
    };
  }

  componentDidMount(): void {
    const that = this;
    const { question_id } = this.props.match.params;
    Questions.list().then((response: AxiosResponse<{results: Question[]}>) => {
      const question = response.data.results.find(x => x.id.toString() === question_id.toString());
      const already_claimed = question ? question.claimed_by !== null : false;

      that.setState({
        error: !question,
        question: question || null,
        already_claimed
      });

      if (!already_claimed && question) {
        Questions.claimQuestion(question.id).then(() => {
          message.success("You claimed the question!");
        }).catch(() => message.error("Failed to claim question! Try refreshing page?"));
      }
    }).catch(() => that.setState({error: true}));
  }

  closeQuestion = (reason: "resolved" | "student_not_found") => {
    if (!this.state.question) return;
    Questions.closeQuestion(
      this.state.question.id, reason === "student_not_found"
    ).then(() => this.setState({is_done: true}));
  }

  renderLoading = () => {
    return <h2><Spin size="large" /> Fetching question</h2>;
  }

  renderAlreadyClaimed = () => {
    return (
      <Alert
        style={{marginBottom: 20}}
        message="This question has already been claimed!"
        description={<p>You can return to the dashboard by clicking <a href={"../admin"}>here</a>.</p>}
        type="warning"
        showIcon
      />
    )
  }

  renderQuestion = () => {
    const { question } = this.state;
    return (
      <div>
        <Descriptions title={<span>Question <small>(#{question!.id})</small></span>} layout={"vertical"} bordered>
          <Descriptions.Item label={"Requester"}>
            <h2>{ question!.requester }</h2>
          </Descriptions.Item>
          <Descriptions.Item label={"Room"}>
            <h2>{ question!.room }</h2>
          </Descriptions.Item>
          <Descriptions.Item label={"Asked"}>
            { moment(question!.created_at, "YYYY-MM-DD HH:mm Z").fromNow() }
          </Descriptions.Item>
          <Descriptions.Item label={"Question"} span={2}>
            { question!.content }
          </Descriptions.Item>
          <Descriptions.Item label={"Status"}>
            <Badge status="processing" text={ question!.status } />
          </Descriptions.Item>
          <Descriptions.Item label={"Actions"} span={3}>
            <Button type={"primary"} onClick={() => this.closeQuestion("resolved")}>
              Mark resolved
            </Button> &nbsp;
            <Button danger onClick={() => this.closeQuestion("student_not_found")}>
              Student not found
            </Button>
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
  }

  renderError = () => {
    return (
      <div>
        <h2>There was an error loading the question!</h2>
        <p>You can return to the dashboard by clicking <a href={"../admin"}>here</a>.</p>
      </div>
    )
  }

  render(): React.ReactNode {
    const { question, error, already_claimed, is_done } = this.state;

    if (is_done) {
      return <Redirect to="../admin" />;
    }

    if (error) return this.renderError();

    return (
      <div id={"assistance"}>
        { already_claimed && this.renderAlreadyClaimed() }
        { question ? this.renderQuestion() : this.renderLoading() }
      </div>
    );
  }
}

export default withRouter(AdminAssistance);
