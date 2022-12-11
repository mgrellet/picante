
import {User} from "./user";
import {AuthData} from "./auth-data";
import {Subject} from "rxjs"; // event emmiter that can be read from enywhere

export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  registerUser(authData: AuthData) {
    this.mockUser(authData);
    this.authChange.next(true);
  }

  login(authData: AuthData) {
    this.mockUser(authData);
    this.authChange.next(true);

  }

  logout() {
    this.user = {
      email: '',
      userId: ''
    }
    this.authChange.next(false);

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
