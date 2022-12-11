
import {User} from "./user";
import {AuthData} from "./auth-data";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router"; // event emmiter that can be read from enywhere

@Injectable() //inject service into service
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();

  constructor(private router: Router) {

  }

  registerUser(authData: AuthData) {
      this.successLogin(authData);

  }

  login(authData: AuthData) {
      this.successLogin(authData);
  }

  private successLogin(authData: AuthData) {
    this.mockUser(authData);
    this.authChange.next(true);
    this.router.navigate(['/dashboard']);
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

  /*isAuth(){
    console.log("isAuth?",this.user !== '' && this.user.email !== '' );
    return this.user.userId !== '' && this.user.email !== '';
}*/

  mockUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      userId: Math.round(Math.random() * 1000).toString()
    }
  }
}
