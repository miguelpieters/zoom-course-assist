import Queue from "../../models/Queue";

export interface IProps {
  question_id: number;
}

export interface IState {
  gif: string;
  queue_data: Queue | null;
  is_closed: boolean;
}
