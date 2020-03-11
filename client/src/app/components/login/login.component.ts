import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', [ Validators.required, Validators.minLength(4) ]),
    password: new FormControl('', [ Validators.required, Validators.minLength(6) ]),
  });

  Login() {
    this.router.navigateByUrl['dashboard']
  }

  constructor(private router: Router) { }

  ngOnInit() { }

}
