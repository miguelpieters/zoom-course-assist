import Controller from "./controller";

export default class Questions extends Controller {

  static list() {
    return this.client.get(
      `questions`,
    );
  }

  static ask(requester: string, room: number, question_type: "assistance" | "room_assignment", content: string) {
    return this.client.post(
      `questions`,
      {
        requester, room, question_type, content
      }
    );
  }

  static getQueue(question_id: number) {
    return this.client.get(
      `queue/${question_id}`
    );
  }

  static closeQuestion(question_id: number, student_not_found: boolean = false) {
    return this.client.put(
      `questions/${question_id}/update`,
    { status: student_not_found ? "student_not_found" : "resolved" }
    );
  }

  static claimQuestion(question_id: number) {
    return this.client.post(
      `questions/${question_id}/claim`
    );
  }
}