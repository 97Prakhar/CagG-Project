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
      educationFormArray: this.fb.array([
        this.initEducationItemRows()
      ]),
      experienceFormArray: this.fb.array([
        this.initExperienceItemRows()
      ]),
      projectFormArray: this.fb.array([
        this.initProjectItemRows()
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

  // Education Dynamic Form
  get educationDetails() {
    return this.editProfileForm.get('educationFormArray') as FormArray;
  }

  initEducationItemRows() {
    return this.fb.group({
      degree: ['', [Validators.required]],
      college: ['', [Validators.required, Validators.minLength(4)]],
      percentage: ['', [Validators.required, Validators.minLength(4)]],
      fromEducationDate: ['', [Validators.required]],
      toEducationDate: ['', [Validators.required]]
    });
  }

  addEducation() {
    this.educationDetails.push(this.initEducationItemRows());
  }

  deleteEducationRow(index: number) {
    this.educationDetails.removeAt(index);
  }

  // Experience Dynamic Form
  get experienceDetails() {
    return this.editProfileForm.get('experienceFormArray') as FormArray;
  }

  initExperienceItemRows() {
    return this.fb.group({
      organisation: ['', [Validators.required, Validators.minLength(4)]],
      designation: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      fromExperienceDate: ['', [Validators.required]],
      toExperienceDate: ['', [Validators.required]]
    });
  }

  addExperience() {
    this.experienceDetails.push(this.initExperienceItemRows());
  }

  deleteExperienceRow(index: number) {
    this.experienceDetails.removeAt(index);
  }

  // Project Dynamic Form
  get projects() {
    return this.editProfileForm.get('projectFormArray') as FormArray;
  }

  initProjectItemRows() {
    return this.fb.group({
      projectTitle: ['', [Validators.required, Validators.minLength(4)]],
      client: ['', [Validators.required, Validators.minLength(4)]],
      location: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(4)]],
      fromProjectDate: ['', [Validators.required]],
      toProjectDate: ['', [Validators.required]]
    });
  }

  addProject() {
    this.projects.push(this.initProjectItemRows());
  }

  deleteProjectRow(index: number) {
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
        education: this.editProfileForm.get('educationFormArray').value,
        experience: this.editProfileForm.get('experienceFormArray').value,
        projectDetails: this.editProfileForm.get('projectFormArray').value,
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

      if (this.editProfileForm.get('educationFormArray').invalid) {
        this.snackBar.open("Invalid Education Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('experienceFormArray').invalid) {
        this.snackBar.open("Invalid Experience Details", '', {
          duration: 1500
        });
      }

      if (this.editProfileForm.get('projectFormArray').invalid) {
        this.snackBar.open("Invalid Project Details", '', {
          duration: 1500
        });
      }
    }
  }
}
