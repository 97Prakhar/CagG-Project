import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
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
  user: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.editProfileForm = this.fb.group({
      firstNameFormControl: ['', [Validators.required, Validators.minLength(4)]],
      lastNameFormControl: ['', [Validators.required, Validators.minLength(4)]],
      contactFormControl: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      countryFormControl: ['', [Validators.required, Validators.minLength(4)]],
      stateFormControl: ['', [Validators.required, Validators.minLength(4)]],
      qualFormControl: ['', [Validators.required, Validators.minLength(4)]],
      expFormControl: ['', [Validators.required, Validators.minLength(4)]],
      projectFormArray: this.fb.array([
        this.initItemRows()
      ])
    });
  }

  ngOnInit() {    
    this.authService.getProfile().subscribe((response: any) => {
      this.user = response;
    }, err => {
      return false;
    });
  }

  get projects() {
    return this.editProfileForm.get('projectFormArray') as FormArray;
  }

  initItemRows() {
    return this.fb.group({
      projectTitle: ['', [Validators.required, Validators.minLength(4)]],
      client: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      duration: ['', [Validators.required]]
    });
  }

  addProject() {
    this.projects.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.projects.removeAt(index);
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
        qualification: this.editProfileForm.get('qualFormControl').value,
        experience: this.editProfileForm.get('expFormControl').value,
        projectDetails: this.editProfileForm.get('projectFormArray').value
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
      if (this.editProfileForm.get('firstNameFormControl').invalid) {
        this.snackBar.open("Invalid First Name", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('lastNameFormControl').invalid) {
        this.snackBar.open("Invalid Last Name", '', {
          duration: 1500
        });
      }

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
    }
  }

  // Save() {
  //   const user = {
  //     firstName: this.editProfileForm.get('firstNameFormControl').value,
  //     lastName: this.editProfileForm.get('lastNameFormControl').value,
  //     contact: this.editProfileForm.get('contactFormControl').value,
  //     country: this.editProfileForm.get('countryFormControl').value,
  //     state: this.editProfileForm.get('stateFormControl').value,
  //     qualification: this.editProfileForm.get('qualFormControl').value,
  //     experience: this.editProfileForm.get('expFormControl').value,
  //     projectDetails: this.editProfileForm.get('projectFormArray').value,
  //   }

  //   console.log(user);

  //   for (let control of this.projects.controls) {
  //     for (let control of this.projects.value) {
  //       console.log({
  //         projectTitle: this.editProfileForm.get(['projectFormArray', 'control']).get('projectTitle').value,
  //         client: this.editProfileForm.get(['projectFormArray', 'control']).get('client').value,
  //         location: this.editProfileForm.get(['projectFormArray', 'control']).get('location').value,
  //         description: this.editProfileForm.get(['projectFormArray', 'control']).get('description').value,
  //         duration: this.editProfileForm.get(['projectFormArray', 'control']).get('duration').value,
  //       });
  //     }
  //   }

  //   console.log(this.projects.value);
  //   console.log(this.editProfileForm.value.projectFormArray.length);
  //   console.log(this.editProfileForm.get(['projectFormArray', '0']).get('projectTitle').value);
  //   console.log({
  //     projectTitle: this.editProfileForm.get(['projectFormArray', '0']).get('projectTitle').value,
  //     client: this.editProfileForm.get(['projectFormArray', '0']).get('client').value,
  //     location: this.editProfileForm.get(['projectFormArray', '0']).get('location').value,
  //     description: this.editProfileForm.get(['projectFormArray', '0']).get('description').value,
  //     duration: this.editProfileForm.get(['projectFormArray', '0']).get('duration').value,
  //   });
  // }
}
