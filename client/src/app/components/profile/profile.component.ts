import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any;
  userDetails: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response;
    }, err => {
      return false;
    });

    this.authService.userDetails().subscribe((response: any) => {
      this.userDetails = response;
    });
  }
}
