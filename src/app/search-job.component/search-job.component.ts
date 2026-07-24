import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-search-job.component',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor, FormsModule, ReactiveFormsModule],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css',
})
export class SearchJobComponent implements OnInit {
  jobService = inject(JobService);

  isValid = signal<boolean>(false);

  jobs = this.jobService.jobs;

  jobsLength = computed(() => this.jobs().length);

  ngOnInit(): void {
    this.jobService.loadJobs();
    this.isValid.set(false);
  }

  onSubmit(enteredInput: HTMLInputElement): void {
    console.log('SearchJobComponent_onSubmit().');

    let userInput = enteredInput.value.toLowerCase();
    console.log('SearchJobComponent_onSubmit()_userInput: ', userInput);

    // So that it practically resets the job filtered list.
    if (this.jobs().length > 0) {
      this.jobService.loadJobs();
    }

    console.log('SearchJobComponent_onSubmit()_this.jobs(): ', this.jobs());

    let filteredInput = this.jobs().filter(
      (j) =>
        j.name.toLowerCase().includes(userInput) ||
        j.techStack.some((tech) => tech.toLowerCase().includes(userInput)) ||
        j.company.toLowerCase().includes(userInput) ||
        j.city.toLowerCase().includes(userInput),
    );
    this.jobs.set(filteredInput);
    this.isValid.set(true);
  }
}
