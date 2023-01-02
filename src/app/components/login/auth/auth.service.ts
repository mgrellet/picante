import {User} from "./user";
import {AuthData} from "./auth-data";
import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router"; // event emmiter that can be read from enywhere
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable() //inject service into service
export class AuthService {
  private user: User;
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router,
              private angularFireAuth: AngularFireAuth,
              private snackBar: MatSnackBar) {

  }

  registerUser(authData: AuthData) {
    this.angularFireAuth.createUserWithEmailAndPassword(authData.email, authData.psswrd)
      .then(result => {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.successLogin(authData.email)
      })
      .catch(error => {
        this.snackBar.open('login incorrecto', '', {
          duration: 3000
        });
        console.log(error)
      });
  }

  public async login(authData: AuthData) {
    this.angularFireAuth.signInWithEmailAndPassword(authData.email, authData.psswrd)
      .then(result => {
        console.log(result);
        this.successLogin(authData.email);
      })
      .catch(e => {
        console.error(e);
        this.snackBar.open('login incorrecto', '', {
          duration: 3000
        });
      });
  }

  successLogin(name: string) {
    console.log("success login")
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/report']);
    this.snackBar.open('Bienvenido ' + name, '', {
      duration: 3000
    });
  }

  logout() {
    this.angularFireAuth.signOut();
    this.isAuthenticated = false;
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
