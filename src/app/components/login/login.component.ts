import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
              private router: Router) {
    this.form = formBuilder.group({
      user: ['', Validators.required],
      pswrd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  login() {
    const user = this.form.value.user;
    const pass = this.form.value.pswrd;

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
