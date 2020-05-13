import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  user: any;
  userDetails: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response.data;
    }, err => {
      return false;
    });

    this.authService.userDetails().subscribe((response: any) => {
      this.userDetails = response.data;
      console.log(this.userDetails);
    });
  }
}
