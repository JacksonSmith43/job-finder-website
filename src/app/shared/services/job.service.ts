import { Injectable, OnInit, signal } from '@angular/core';

import { JobType } from '../model/job-type.model';

@Injectable({
  providedIn: 'root',
})
export class JobService implements OnInit {
  jobs = signal<JobType[]>([]);

  ngOnInit(): void {
    console.log('JobService_ngOnInit().');
  }

  loadJobs(): void {
    console.log('loadJobs().');

    const mockJobs = [
      {
        id: 1,
        name: 'Angular Developer',
        techStack: ['Angular', 'Git', 'HTML', 'CSS'],
        company: 'Pretentious GmbH',
        isAvailable: true,
      },
      {
        id: 2,
        name: 'Java Developer',
        techStack: ['Java', 'Git', 'Spring Boot'],
        company: 'Too Much Money GmbH',
        isAvailable: true,
      },
    ];

    this.jobs.set(mockJobs);
  }
}
