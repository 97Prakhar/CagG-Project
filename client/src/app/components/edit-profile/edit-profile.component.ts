import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;
  user: any;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.editProfileForm = new FormGroup({
      firstNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastNameFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      contactFormControl: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
      countryFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      stateFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      techFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      qualification: new FormControl('', [Validators.required, Validators.minLength(4)]),
      experience: new FormControl('', [Validators.required, Validators.minLength(4)]),
      projects: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit() {
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response;
    }, err => {
      return false;
    });
  }

  Save(): any {
    if (this.editProfileForm.valid) {
      let obs = this.authService.editProfile({
        firstName: this.editProfileForm.get('firstNameFormControl').value,
        lastName: this.editProfileForm.get('lastNameFormControl').value,
        email: this.user.email,
        contact: this.editProfileForm.get('contactFormControl').value,
        country: this.editProfileForm.get('countryFormControl').value,
        state: this.editProfileForm.get('stateFormControl').value,
        technology: this.editProfileForm.get('techFormControl').value,
        qualification: this.editProfileForm.get('qualFormControl').value,
        experience: this.editProfileForm.get('expFormControl').value,
        projects: this.editProfileForm.get('projectFormControl').value
      });
      obs.subscribe((response: any) => {
        if (response.status) {
          this.snackBar.open("Profile Data Saved", '', {
            duration: 1500
          });
        } else {
          this.snackBar.open(response.error, '', {
            duration: 1500
          });
        }
      })
    }
    else {
      if (this.editProfileForm.get('contactFormControl').invalid) {
        this.snackBar.open("Invalid Contact Number", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('countryFormControl').invalid) {
        this.snackBar.open("Invalid Country Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('stateFormControl').invalid) {
        this.snackBar.open("Invalid State Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('techFormControl').invalid) {
        this.snackBar.open("Invalid Technology Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('qualFormControl').invalid) {
        this.snackBar.open("Invalid Qualification Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('expFormControl').invalid) {
        this.snackBar.open("Invalid Experience Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('projectFormControl').invalid) {
        this.snackBar.open("Invalid Project Details", '', {
          duration: 1500
        });
      }
    }
  }
}
