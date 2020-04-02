import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {
    this.loginForm = new FormGroup({
      mailIdFormControl: new FormControl('', [Validators.required, Validators.email]),
      passwordFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() { }

  Login() {
    const user = {
      mailId: this.loginForm.get('mailIdFormControl').value,
      password: this.loginForm.get('passwordFormControl').value
    }
    this.authService.authenticateUser(user).subscribe(res => {
      if (res.status) {
        this.authService.storeUserData(res.data.token, res.data.email);
        this.router.navigate(['dashboard']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }
}
