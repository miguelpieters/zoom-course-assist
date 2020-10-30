import User from "./User";

export default interface Question {

  id: number;
  created_at: string;
  requester: string;
  room: number;
  question_type: "assistance" | "room_assignment";
  claimed_by: User | null;
  content: string;
  status: "open" | "resolved" | "student_not_found";

}