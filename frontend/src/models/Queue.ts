import Question from "./Question";

export default interface Queue {
  queue_size: number;
  position: number;
  question: Question;
}