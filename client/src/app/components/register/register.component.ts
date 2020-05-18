import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),

      confirmPasswordFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  ngOnInit() { }

  Register(): any {
    if (this.registerForm.valid) {
      if (this.registerForm.get('passwordFormControl').value === this.registerForm.get('confirmPasswordFormControl').value) {
        let obs = this.authService.registerUser({
          email: this.registerForm.get('emailFormControl').value,
          password: this.registerForm.get('passwordFormControl').value,
          confirmPassword: this.registerForm.get('confirmPasswordFormControl').value
        });
        obs.subscribe((response: any) => {
          if (response.status) {
            this.router.navigateByUrl('/login');
          }
        })
      }
      else {
        this.snackBar.open("Passwords doesn't Match", '', {
          duration: 1500
        });
      }
    } else {
      if (this.registerForm.get('emailFormControl').invalid) {
        this.snackBar.open("Invalid Email Address", '', {
          duration: 1500
        });
      }

      if (this.registerForm.get('passwordFormControl').invalid) {
        this.snackBar.open("Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }

      if (this.registerForm.get('confirmPasswordFormControl').invalid) {
        this.snackBar.open("Confirm Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }
    }
  }
}
