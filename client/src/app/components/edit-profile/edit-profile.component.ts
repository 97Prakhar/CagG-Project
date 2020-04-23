import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup;

  constructor() {
    this.editProfileForm = new FormGroup({
      contactFormControl: new FormControl('', [Validators.required, Validators.pattern("[0-9]{0-10}")]),
      countryFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      stateFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      techFormControl: new FormControl('', [Validators.required, Validators.minLength(4)]),
      mentorFormControl: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit() { }

  Save() {
    const user = {
      contact: this.editProfileForm.get('contactFormControl').value,
      country: this.editProfileForm.get('countryFormControl').value,
      state: this.editProfileForm.get('stateFormControl').value,
      technology: this.editProfileForm.get('techFormControl').value,
      mentor: this.editProfileForm.get('mentorFormControl').value
    }
  }
}
