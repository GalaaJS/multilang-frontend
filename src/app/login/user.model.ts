export class UserModel {
  constructor(user_id: number, username: string) {
    this.user_id = user_id;
    this.username = username;
  }

  user_id: number;
  username: string;
}
