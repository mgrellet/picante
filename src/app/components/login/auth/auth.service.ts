import {User} from "./user";
import {AuthData} from "./auth-data";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router"; // event emmiter that can be read from enywhere
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable() //inject service into service
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {

  }

  registerUser(authData: AuthData) {
    console.log("user", authData.email);
    console.log("pass", authData.psswrd);
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.psswrd)
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.successLogin()
      })
      .catch(error => console.log(error));
  }

  login(authData: AuthData) {
    this.successLogin();
  }

  private successLogin() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.isAuthenticated = false;
    this.user = {
      email: '',
      psswrd: ''
    }
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user};
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
