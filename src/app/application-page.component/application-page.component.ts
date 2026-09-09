import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerModule } from 'primeng/datepicker';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatButton } from '@angular/material/button';

import { LocalStorageService } from '../shared/services/local-storage.service';
import { JobService } from '../shared/services/job.service';
import { JobType } from '../shared/model/job-type.model';

@Component({
  selector: 'app-application-page',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    DatePickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatButton,
  ],
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css',
})
export class ApplicationPageComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  jobService = inject(JobService);
  private _formBuilder = inject(FormBuilder);

  isLinear = signal(true); // This is always true so that one can never click through the stepper bar (personal details, documents), without other logic allowing it (when the form has successfully been filled out).

  currentJob = this.jobService.currentJob;

  personalProfileFormGroup = this._formBuilder.group({
    // Ctrl stands for Control.
    fullNameCtrl: ['', Validators.required],
    genderCtrl: ['', Validators.required],
    birthdateCtrl: ['', Validators.required],
    phoneNumberCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    addressCtrl: ['', Validators.required],
  });

  educationFormGroup = this._formBuilder.group({
    highestDegreeCtrl: ['', Validators.required],
    schoolInstitutionCtrl: ['', Validators.required],
    yearCompletedCtrl: ['', Validators.required],
  });

  jobFormGroup = this._formBuilder.group({
    employmentStatusCtrl: ['', Validators.required],
    availabletStartDateCtrl: ['', Validators.required],
    experienceCtrl: ['', Validators.required],
    lastEmploymentCtrl: ['', Validators.required],
    positionHeldCtrl: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
  });

  documentsFormGroup = this._formBuilder.group({
    cv: ['', Validators.required],
  });

  ngOnInit(): void {
    console.log('ApplicationPageComponent_ngOnInit().');

    let applySelectedJob = this.localStorageService.getFromLocalStorage('applyForSelectedJob');
    this.currentJob.set(applySelectedJob as JobType);
  }

  get stepForms(): FormGroup[] {
    return [
      this.personalProfileFormGroup,
      this.educationFormGroup,
      this.jobFormGroup,
      this.documentsFormGroup,
    ] as FormGroup[];
  }

  onNextStep(stepper: MatStepper): void {
    console.log('onStepper().');

    let currentIndex = stepper.selectedIndex;
    let currentForm = this.stepForms[currentIndex];
    console.log('onStepper()_selectedStep: ', currentIndex);
    console.log('onStepper()_currentForm: ', currentForm);

    currentForm.markAllAsTouched();

    if (currentForm.invalid) {
      return;
    }

    stepper.next();
  }

  hasFieldError(formGroup: FormGroup, controlName: string) {
    console.log('hasFieldError().');

    const control = formGroup.get(controlName);
    return control && control.invalid && control.touched ? 'field-error' : '';
  }
}
