/**
 * Created by CaiMinghui on 2017/7/17.
 */
export class User {
  userName: string;
  password:string;
  account:string;
  userId: string;
  expire: string;
  signCode:string;
}


export class LoginModel {
  user: User;
}

export class Password {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string
}
