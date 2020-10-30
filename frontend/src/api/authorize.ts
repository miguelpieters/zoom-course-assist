import Controller from "./controller";

export default class Authorize extends Controller {

  static authenticate(username: string, password: string) {
    return this.client.post(
      `token`,
      { username, password }
    );
  }
}