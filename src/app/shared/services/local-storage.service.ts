import { Injectable } from '@angular/core';

import { JobType } from '../model/job-type.model';
import { SelectedFilters } from '../model/filters-jobs-type.model';

type StorageKey = 'selectedJob' | 'filteredJobs' | 'filters';
type SerialisedSelectedFilters = Record<keyof SelectedFilters, string[]>;

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  saveToLocalStorage(
    job: JobType | JobType[] | SelectedFilters,
    key: StorageKey,
  ): JobType | JobType[] | SelectedFilters {
    console.log('saveToLocalStorage().');
    console.log('saveToLocalStorage()_job: ', job);

    if (key === 'filters') {
      // Serialise the filters before saving them to local storage. Otherwise, Sets cannot be stored directly.
      localStorage.setItem(key, JSON.stringify(this.serialiseFilters(job as SelectedFilters)));
      return job;
    }

    localStorage.setItem(key, JSON.stringify(job));
    return job;
  }

  // Having multiple method signatures is called overload signature.
  // The actual implementation comes after the overload signatures. The first two merely exist for the
  // compiler, for type checking purposes. Only the last one runs at runtime.
  // So when you give "filters", then the return type will be SelectedFilters | null.
  getFromLocalStorage(key: 'filters'): SelectedFilters | null;
  // For all other keys ('selectedJob' and 'filteredJobs'), the return type will be JobType | JobType[] | null.
  getFromLocalStorage(key: Exclude<StorageKey, 'filters'>): JobType | JobType[] | null;
  getFromLocalStorage(key: StorageKey): JobType | JobType[] | SelectedFilters | null {
    console.log('getFromLocalStorage().');

    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }

    try {
      const parsed = JSON.parse(item);

      if (key === 'filters') {
        return this.deserialiseFilters(parsed as SerialisedSelectedFilters);
      }

      return parsed as JobType | JobType[];
    } catch {
      return null;
    }
  }

  removeFromLocalStorage(key: StorageKey): void {
    console.log('removeFromLocalStorage().');
    localStorage.removeItem(key);
  }

  private serialiseFilters(filters: SelectedFilters): SerialisedSelectedFilters {
    return {
      positionLevel: Array.from(filters.positionLevel),
      employmentType: Array.from(filters.employmentType),
      workMode: Array.from(filters.workMode),
      salary: Array.from(filters.salary),
      city: Array.from(filters.city),
      jobThemes: Array.from(filters.jobThemes),
    };
  }

  private deserialiseFilters(filters: SerialisedSelectedFilters): SelectedFilters {
    return {
      positionLevel: new Set(filters?.positionLevel ?? []),
      employmentType: new Set(filters?.employmentType ?? []),
      workMode: new Set(filters?.workMode ?? []),
      salary: new Set(filters?.salary ?? []),
      city: new Set(filters?.city ?? []),
      jobThemes: new Set(filters?.jobThemes ?? []),
    };
  }
}
