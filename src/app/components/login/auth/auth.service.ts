import {User} from "./user";
import {AuthData} from "./auth-data";

export class AuthService {
  private user: User;

  registerUser(authData: AuthData) {
    this.mockUser(authData);
  }

  login(authData: AuthData) {
    this.mockUser(authData);
  }

  logout() {
    this.user = {
      email: '',
      userId: ''
    }
  }

  getUser() {
    return {...this.user};
  }

  isAuth(){
    return this.user.userId !== '' && this.user.email !== '';
}

  mockUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
  }
}
