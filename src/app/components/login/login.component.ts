import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService) {
    this.form = formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    this.authService.login({
      email: this.form.value.user,
      password: this.form.value.password
    })

    const user = this.form.value.user;
    const pass = this.form.value.password;

    if (user === 'mgrellet' && pass === '123') {
      this.loading = true;
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 1500)
    } else {
      this.form.reset();
      this.errorMessage();
    }
  }

  errorMessage() {
    this.snackBar.open('login incorrecto', '', {
      duration: 3000
    });
  }

}
