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

  constructor(private authService: AuthService) {
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response;
    });

    this.authService.userDetails().subscribe((response: any) => {
      this.userDetails = response;
    });
  }

  ngOnInit() { }
}
