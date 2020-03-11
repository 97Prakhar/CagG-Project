import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(4)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('([^\d])\d{10}([^\d])')]),
    technology: new FormControl('', [Validators.required, Validators.minLength(4)]),
    country: new FormControl('', [Validators.required, Validators.minLength(4)]),
    state: new FormControl('', [Validators.required, Validators.minLength(4)]),
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  SignUp() {
    this.router.navigateByUrl['login']
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
