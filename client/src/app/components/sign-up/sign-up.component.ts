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

// export class SignUpComponent implements OnInit {
  export class SignUpComponent {
  selectedValue: string;
  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.signupForm = new FormGroup({
      firstNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mailIdFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() { }

  SignUp() {
    if (this.signupForm.valid) {
      const user = {
        firstName: this.signupForm.get('firstNameFormControl').value,
        lastName: this.signupForm.get('lastNameFormControl').value,
        mailId: this.signupForm.get('mailIdFormControl').value,
        password: this.signupForm.get('passwordFormControl').value,
        confirmPassword: this.signupForm.get('confirmPasswordFormControl').value
      }
      if (this.signupForm.get('passwordFormControl').value == this.signupForm.get('confirmPasswordFormControl').value) {
        this.authService.registerUser(user);
        this.router.navigateByUrl['/login'];
      } else {
        this.snackBar.open("Password don't match", '', {
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

      if (this.signupForm.get('mailIdFormControl').invalid) {
        this.snackBar.open("Invalid Email Address", '', {
          duration: 1500
        });
      }

      if (this.signupForm.get('passwordFormControl').invalid) {
        this.snackBar.open("Password is required and should have at least 6 alphabets", '', {
          duration: 1500
        });
      }
    }
  }
}
