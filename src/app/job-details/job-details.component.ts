import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTag,
  faClock,
  faLayerGroup,
  faCircleCheck,
  faList,
  faSackDollar,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';

import { JobService } from '../shared/services/job.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-job-details.component',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css',
})
export class JobDetailsComponent implements OnInit {
  jobService = inject(JobService);
  localStorageService = inject(LocalStorageService);
  route = inject(ActivatedRoute);

  allJobs = this.jobService.allJobs;
  currentJob = this.jobService.currentJob;
  filteredJobs = this.jobService.filteredJobs;

  // FontAwesome icons.
  faTag = faTag;
  faClock = faClock;
  faLayerGroup = faLayerGroup;
  faCircleCheck = faCircleCheck;
  faList = faList;
  faSackDollar = faSackDollar;
  faLocationDot = faLocationDot;

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
          const jobLocalStorage = this.localStorageService.getFromLocalStorage('selectedJob');

          if (jobLocalStorage && !Array.isArray(jobLocalStorage)) {
            this.jobService.currentJob.set(jobLocalStorage);
            console.log(
              'getJobById()_Job fetched from LocalStorage_jobLocalStorage: ',
              jobLocalStorage,
            );
          } else {
            console.log('getJobById()_Unable to get job from LocalStorage.');
          }
        }
      } else {
        console.log('getJobById()_No job ID provided in route parameters.');
      }
    });
  }

  getTechLogo(tech: string): string {
    return this.jobService.techStack[tech] ?? 'default-tech.png';
  }

  onFilterTechStack(tech: string) {
    console.log('onFilterTechStack().');
    console.log('onFilterTechStack()_tech: ', tech);
    console.log('onFilterTechStack()_this.allJobs(): ', this.allJobs());

    let filteredTechStackList: boolean[] = this.allJobs().map((job) =>
      job.techStack.includes(tech),
    );
    console.log('onFilterTechStack()_filteredTechStackList: ', filteredTechStackList);

    this.filteredJobs.set(this.allJobs().filter((job, index) => filteredTechStackList[index]));
    console.log('onFilterTechStack()_this.filteredJobs(): ', this.filteredJobs());
    this.localStorageService.saveToLocalStorage(this.filteredJobs(), 'filteredJobs');
  }
}
