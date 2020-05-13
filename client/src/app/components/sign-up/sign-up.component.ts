import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  //selectedValue: string;
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.signupForm = new FormGroup({
      firstNameFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),

      lastNameFormControl: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),

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

  SignUp(): any {
    if (this.signupForm.valid) {
      if (this.signupForm.get('passwordFormControl').value === this.signupForm.get('confirmPasswordFormControl').value) {
        let obs = this.authService.registerUser({
          firstName: this.signupForm.get('firstNameFormControl').value,
          lastName: this.signupForm.get('lastNameFormControl').value,
          email: this.signupForm.get('emailFormControl').value,
          password: this.signupForm.get('passwordFormControl').value,
          confirmPassword: this.signupForm.get('confirmPasswordFormControl').value
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
      if (this.signupForm.get('firstNameFormControl').invalid) {
        this.snackBar.open("First Name Required and should have at least 4 alphabets", '', {
          duration: 1500
        });
      }

      if (this.signupForm.get('lastNameFormControl').invalid) {
        this.snackBar.open("Last Name Required and should have at least 4 alphabets", '', {
          duration: 1500
        });
      }

      if (this.signupForm.get('emailFormControl').invalid) {
        this.snackBar.open("Invalid Email Address", '', {
          duration: 1500
        });
      }

      if (this.signupForm.get('passwordFormControl').invalid) {
        this.snackBar.open("Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }

      if (this.signupForm.get('confirmPasswordFormControl').invalid) {
        this.snackBar.open("Confirm Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }
    }
  }
}
