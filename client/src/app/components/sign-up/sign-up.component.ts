import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.signupForm = new FormGroup({
      firstNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mailIdFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPasswordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
      roleFormControl: new FormControl('', [Validators.required])
    });
  }

  roles = [
    { value: 'Mentor', viewValue: 'Mentor' },
    { value: 'Mentee', viewValue: 'Mentee' }
  ];

  ngOnInit() { }

  SignUp() {
    const user = {
      firstName: this.signupForm.get('firstNameFormControl').value,
      lastName: this.signupForm.get('lastNameFormControl').value,
      mailId: this.signupForm.get('mailIdFormControl').value,
      password: this.signupForm.get('passwordFormControl').value,
      confirmPassword: this.signupForm.get('confirmPasswordFormControl').value,
      role: this.signupForm.get('roleFormControl').value
    }
    this.authService.registerUser(user);
    this.router.navigateByUrl['/login'];
  }
}
