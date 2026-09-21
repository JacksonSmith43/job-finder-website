import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
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
  stepperOrientation = signal<'horizontal' | 'vertical'>('horizontal');
  private mobileBreakpoint = 768;

  currentJob = this.jobService.currentJob;

  srAnnouncement = '';

  employment = {
    status: '',
    common: {
      // availableStartDate: '',
      experience: '',
    },
    student: {
      nameOfStudy: '',
      currentSemester: '',
      graduationDate: '',
    },
    employed: {
      companyName: '',
      positionHeld: '',
      startDate: '',
      endDate: '',
    },
    selfEmployed: {
      projectType: '',
      longTermProject: '',
    },
    unemployed: {
      recentRole: '',
    },
    notCurrentlyListed: {
      otherRole: '',
    },
  };

  personalProfileFormGroup = this._formBuilder.group({
    // Ctrl stands for Control.
    fullNameCtrl: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    genderCtrl: ['', Validators.required],
    birthdateCtrl: ['', Validators.required],
    phoneNumberCtrl: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    emailCtrl: ['', [Validators.required, Validators.email]],
    addressCtrl: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
  });

  educationFormGroup = this._formBuilder.group({
    highestDegreeCtrl: ['', Validators.required],
    schoolInstitutionCtrl: ['', Validators.required],
    yearCompletedCtrl: ['', Validators.required],
  });

  jobFormGroup = this._formBuilder.group({
    // Common.
    employmentStatusCtrl: ['', Validators.required],
    availableStartDateCtrl: ['', Validators.required],
    experienceCtrl: ['', Validators.required],

    // Student.
    nameOfStudyCtrl: [''],
    currentSemesterCtrl: [''],
    graduationDateCtrl: [''],

    // Employed.
    companyNameCtrl: [''],
    positionHeldCtrl: [''],
    startEmploymentDateCtrl: [''],
    endEmploymentDateCtrl: [''],

    // Self-Employed.
    projectTypeCtrl: [''],
    longTermProjectCtrl: [''],

    // Unemployed.
    recentRoleCtrl: [''],

    // Not currently listed.
    otherRoleCtrl: [''],
  });

  documentsFormGroup = this._formBuilder.group({
    cv: ['', Validators.required],
  });

  ngOnInit(): void {
    console.log('ApplicationPageComponent_ngOnInit().');

    let applySelectedJob = this.localStorageService.getFromLocalStorage('applyForSelectedJob');
    this.currentJob.set(applySelectedJob as JobType);

    this.jobFormGroup
      .get('employmentStatusCtrl')
      ?.valueChanges.subscribe(() => this.applyEmploymentValidators());
    this.applyEmploymentValidators();
    this.updateStepperOrientation();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.updateStepperOrientation();
  }

  private updateStepperOrientation(): void {
    this.stepperOrientation.set(
      window.innerWidth <= this.mobileBreakpoint ? 'vertical' : 'horizontal',
    );
  }

  onNextStep(stepper: MatStepper, currentForm: FormGroup): void {
    console.log('onStepper().');

    console.log('onStepper()_currentForm: ', currentForm);

    currentForm.markAllAsTouched();

    console.log('onStepper()_currentForm: ', currentForm);

    let invalidErrorLength = this.formGroupErrorLength(currentForm);
    console.log('onStepper()_invalidErrorLength: ', invalidErrorLength);

    if (invalidErrorLength > 0) {
      this.srAnnouncement = `There are ${invalidErrorLength} validation errors.`;
    } else {
      this.srAnnouncement = '';
    }

    if (currentForm.invalid) {
      return;
    }

    stepper.next();
  }

  applyEmploymentValidators() {
    console.log('applyEmploymentValidators().');
    const employmentStatus = this.jobFormGroup.get('employmentStatusCtrl')?.value;

    if (employmentStatus === 'student') {
      this.jobFormGroup.get('nameOfStudyCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('currentSemesterCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('graduationDateCtrl')?.setValidators([Validators.required]);
    } else {
      this.jobFormGroup.get('nameOfStudyCtrl')?.clearValidators();
      this.jobFormGroup.get('currentSemesterCtrl')?.clearValidators();
      this.jobFormGroup.get('graduationDateCtrl')?.clearValidators();
    }

    if (employmentStatus === 'employed') {
      this.jobFormGroup.get('companyNameCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('positionHeldCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('startEmploymentDateCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('endEmploymentDateCtrl')?.setValidators([Validators.required]);
    } else {
      this.jobFormGroup.get('companyNameCtrl')?.clearValidators();
      this.jobFormGroup.get('positionHeldCtrl')?.clearValidators();
      this.jobFormGroup.get('startEmploymentDateCtrl')?.clearValidators();
      this.jobFormGroup.get('endEmploymentDateCtrl')?.clearValidators();
    }

    if (employmentStatus === 'selfEmployed') {
      this.jobFormGroup.get('projectTypeCtrl')?.setValidators([Validators.required]);
      this.jobFormGroup.get('longTermProjectCtrl')?.setValidators([Validators.required]);
    } else {
      this.jobFormGroup.get('projectTypeCtrl')?.clearValidators();
      this.jobFormGroup.get('longTermProjectCtrl')?.clearValidators();
    }

    if (employmentStatus === 'unemployed') {
      this.jobFormGroup.get('recentRoleCtrl')?.setValidators([Validators.required]);
    } else {
      this.jobFormGroup.get('recentRoleCtrl')?.clearValidators();
    }

    if (employmentStatus === 'notCurrentlyListed') {
      this.jobFormGroup.get('otherRoleCtrl')?.setValidators([Validators.required]);
    } else {
      this.jobFormGroup.get('otherRoleCtrl')?.clearValidators();
    }

    const conditionalControls = [
      'nameOfStudyCtrl',
      'currentSemesterCtrl',
      'graduationDateCtrl',
      'companyNameCtrl',
      'positionHeldCtrl',
      'startEmploymentDateCtrl',
      'endEmploymentDateCtrl',
      'projectTypeCtrl',
      'longTermProjectCtrl',
      'recentRoleCtrl',
      'otherRoleCtrl',
    ];

    conditionalControls.forEach((controlName) => {
      this.jobFormGroup.get(controlName)?.updateValueAndValidity({ emitEvent: false });
    });

    this.jobFormGroup.updateValueAndValidity({ emitEvent: false });
  }

  hasFieldError(formGroup: FormGroup, controlName: string) {
    console.log('hasFieldError().');

    const control = formGroup.get(controlName);
    return control && control.invalid && control.touched ? 'field-error' : '';
  }

  formGroupErrorLength(formGroup: FormGroup): number {
    // Object.values() takes an object and returns an array of its values. Here, it is used to get an array of all form controls in the form group.
    return Object.values(formGroup.controls).filter((control) => control.invalid).length;
  }
}
