import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-job-details.component',
  imports: [],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit {
  jobService = inject(JobService);
  route = inject(ActivatedRoute);

  currentJob = this.jobService.currentJob;
  // This gets the job ID from the route parameters and assigns it to the $jobId signal.
  $jobId = this.route.paramMap.pipe(map((params) => params.get('id')));

  ngOnInit(): void {
    this.getJobById();
  }

  getJobById(): void {
    console.log('getJobById().');

    this.$jobId.subscribe((jobId) => {
      if (jobId) {
        // +jobId converts the string jobId to a number.
        const job = this.jobService.allJobs().find((job) => job.id === +jobId);
        if (job) {
          console.log('getJobById()_Job found: ', job);
          this.currentJob.set(job);
        } else {
          console.log('getJobById()_Job not found for ID: ', jobId);
        }
      } else {
        console.log('getJobById()_No job ID provided in route parameters.');
      }
    });
  }
}
