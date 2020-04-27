import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { DataService } from '../../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  user: Object;

  constructor(private authService: AuthService, private dataService: DataService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((profile: any) => {
      this.user = profile.user;
    }, err => {
      return false;
    });

    this.dataService.userDetails(this.user);
  }
}
