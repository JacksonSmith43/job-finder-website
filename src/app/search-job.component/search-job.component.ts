import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

import { JobService } from '../shared/services/job.service';
import { JobType } from '../shared/model/job-type.model';

@Component({
  selector: 'app-search-job.component',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor, FormsModule],
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

  onSubmit(): void {
    console.log('SearchJobComponent_onSubmit().');
    this.isValid.set(true);
  }
}
