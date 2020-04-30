import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() { }

  Login(): any {
    if (this.loginForm.valid) {
      this.authService.logInUser({
        email: this.loginForm.get('emailFormControl').value,
        password: this.loginForm.get('passwordFormControl').value
      }).subscribe((response: any) => {
        if (response.status) {
          this.authService.storeUserData(response.token, response.email);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.router.navigateByUrl('/login');
        }
      })
    } else {
      if (this.loginForm.get('mailIdFormControl').invalid) {
        this.snackBar.open("Invalid Email Address", '', {
          duration: 1500
        });
      }

      if (this.loginForm.get('passwordFormControl').invalid) {
        this.snackBar.open("Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }
    }
  }
}
