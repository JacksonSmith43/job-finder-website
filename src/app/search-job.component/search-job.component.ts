import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-search-job.component',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor, FormsModule, ReactiveFormsModule],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css',
})
export class SearchJobComponent implements OnInit {
  jobService = inject(JobService);

  allJobs = this.jobService.allJobs;
  filteredJobs = this.jobService.filteredJobs;

  jobsLength = computed(() => this.filteredJobs().length);

  form = new FormGroup({
    userInput: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(80),
    ]),
  });

  ngOnInit(): void {
    console.log('SearchJobComponent_ngOnInit().');
    this.jobService.loadJobs();
    this.filteredJobs.set(this.allJobs());
    console.log('SearchJobComponent_ngOnInit()_filteredJobs: ', this.filteredJobs());
  }

  onSubmit(enteredInput: HTMLInputElement): void {
    console.log('SearchJobComponent_onSubmit().');

    if (!this.form.controls.userInput.valid) {
      return;
    }

    let userInput = enteredInput.value.toLowerCase().trim();

    console.log('SearchJobComponent_onSubmit()_userInput: ', userInput);
    console.log('SearchJobComponent_onSubmit()_this.jobs(): ', this.allJobs());

    let filteredInput = this.allJobs().filter(
      (j) =>
        j.name.toLowerCase().includes(userInput) ||
        j.techStack.some((tech) => tech.toLowerCase().includes(userInput)) ||
        j.company.toLowerCase().includes(userInput) ||
        j.city.toLowerCase().includes(userInput),
    );
    this.filteredJobs.set(filteredInput);
    console.log('SearchJobComponent_onSubmit()_filteredInput: ', filteredInput);

    this.form.reset();
  }

  get inputIsValid() {
    if (this.form.controls.userInput.hasError('required')) {
      return 'An input is required.';
    } else if (this.form.controls.userInput.hasError('minlength')) {
      return 'The input has to at least contain 2 characters.';
    } else if (this.form.controls.userInput.hasError('maxlength')) {
      return 'The input only allows a maximum of 80 characters.';
    } else {
      return 'Some other issue.';
    }
  }
}
