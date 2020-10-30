import Question from "../../../models/Question";

export interface IProps {
  questions: Question[] | undefined;
  pollData: (cls?: () => any) => void;
}

export interface IState {
  closable_questions: Question[];
}