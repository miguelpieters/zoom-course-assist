export const getLoggedInUser = (): string | null => {
  return localStorage.getItem("user");
}

export const getUserRoom = (): string | null => {
  return localStorage.getItem("room");
}

export const getLatestQuestion = (): string | null => {
  return localStorage.getItem("question");
}

export const setUser = (name: string): void => {
  localStorage.setItem("name", name);
}

export const setRoom = (room: number): void => {
  localStorage.setItem("room", room.toString());
}

export const setQuestion = (question: number): void => {
  localStorage.setItem("question", question.toString());
}
