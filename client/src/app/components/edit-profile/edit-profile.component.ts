import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {
    this.editProfileForm = new FormGroup({
      contactFormControl: new FormControl('', [Validators.required, Validators.pattern("[0-9]{0-10}")]),
      countryFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      stateFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      techFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      //mentorFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() { }

  Save() {
    if (this.editProfileForm.valid) {
      const data = {
        contact: this.editProfileForm.get('contactFormControl').value,
        country: this.editProfileForm.get('countryFormControl').value,
        state: this.editProfileForm.get('stateFormControl').value,
        technology: this.editProfileForm.get('techFormControl').value,
        //mentor: this.editProfileForm.get('mentorFormControl').value
      }
      this.authService.editProfile(data);
      this.snackBar.open("Profile Data Saved", '', {
        duration: 1500
      });
      this.router.navigateByUrl['/dashboard'];
    }
    else {
      if (this.editProfileForm.get('contactFormControl').invalid) {
        this.snackBar.open("Invalid Contact Number", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('countryFormControl').invalid) {
        this.snackBar.open("Invalid Country", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('stateFormControl').invalid) {
        this.snackBar.open("Invalid State", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('techFormControl').invalid) {
        this.snackBar.open("Invalid Technology", '', {
          duration: 1500
        });
      }

      // if (this.editProfileForm.get('mentorFormControl').invalid) {
      //   this.snackBar.open("Invalid Mentor Name", '', {
      //     duration: 1500
      //   });
      // }
    }
  }
}
