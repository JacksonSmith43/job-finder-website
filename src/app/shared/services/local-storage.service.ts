import { Injectable } from '@angular/core';

import { JobType } from '../model/job-type.model';

type StorageKey = 'selectedJob' | 'filteredJobs';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  saveToLocalStorage(job: JobType | JobType[], key: StorageKey): JobType | JobType[] {
    console.log('saveToLocalStorage().');
    console.log('saveToLocalStorage()_job: ', job);

    localStorage.setItem(key, JSON.stringify(job));
    return job;
  }

  getFromLocalStorage(key: StorageKey): JobType | JobType[] | null {
    console.log('getFromLocalStorage().');

    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      return JSON.parse(item) as JobType | JobType[];
    } catch {
      return null;
    }
  }

  removeFromLocalStorage(key: StorageKey): void {
    console.log('removeFromLocalStorage().');
    localStorage.removeItem(key);
  }
}
