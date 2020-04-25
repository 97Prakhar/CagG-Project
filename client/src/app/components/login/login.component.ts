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
      mailIdFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() { }

  Login() {
    if (this.loginForm.valid) {
      const user = {
        mailId: this.loginForm.get('mailIdFormControl').value,
        password: this.loginForm.get('passwordFormControl').value
      }
      this.authService.logInUser(user).subscribe((res: any) => {
        if (res.status) {
          this.authService.storeUserData(res.data.token, res.data.email);
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['login']);
        }
      });
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
