import { Injectable } from '@angular/core';

import { JobType } from '../model/job-type.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  saveToLocalStorage(job: JobType | JobType[], key: 'selectedJob'): JobType | JobType[] | string {
    console.log('saveToLocalStorage().');
    console.log('saveToLocalStorage()_job: ', job);

    if (key === 'selectedJob') {
      if (job != null) {
        localStorage.setItem(key, JSON.stringify(job));
        return job;
      }
    }
    return 'Wrong key.';
  }

  getFromLocalStorage(key: 'selectedJob'): string | JobType[] | null {
    console.log('getFromLocalStorage().');

    if (key === 'selectedJob') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return 'Wrong key.';
  }
}
