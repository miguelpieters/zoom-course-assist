import Question from "../../../models/Question";

export interface IState {
  question: Question | null;
  error: boolean;
  already_claimed: boolean;
  is_done: boolean;
}