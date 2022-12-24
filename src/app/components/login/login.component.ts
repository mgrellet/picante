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
      email: ['', Validators.required],
      psswrd: ['', Validators.required]
    })
  }

  ngOnInit(): void {  }

  login() {
    console.log(this.form.value.email);
    console.log(this.form.value.psswrd);
    this.authService.login({
      email: this.form.value.email,
      psswrd: this.form.value.psswrd
    })
  }

  errorMessage() {
    this.snackBar.open('login incorrecto', '', {
      duration: 3000
    });
  }

}
