import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(user): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let obs = this.http.post('http://localhost:3000/users/register', user, { headers: headers });
    return obs;
  }

  logInUser(user): any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let obs = this.http.post('http://localhost:3000/users/logIn', user, { headers: headers });
    return obs;
  }

  editProfile(data): any {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    let obs = this.http.post('http://localhost:3000/users/edit', data, { headers: headers });
    return obs;
  }

  getProfile(): any {
    this.loadToken();
    let headers = new HttpHeaders({
      'Authorization': this.authToken,
      'Content-Type': 'application/json'
    });
    let obs = this.http.get('http://localhost:3000/users/dashboard', { headers: headers });
    return obs;
  }

  storeUserData(token, user): any {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(): any {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(): any {
    const token: string = localStorage.getItem('id_token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): any {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
