import { Component, computed, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatAnchor } from '@angular/material/button';

import { JobService } from '../shared/services/job.service';

type PropertyCategory =
  'positionLevel' | 'employmentType' | 'workMode' | 'salary' | 'city' | 'jobThemes';

type SelectedFilters = Record<PropertyCategory, Set<string>>;

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [MatExpansionModule, FormsModule, MatAnchor],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css',
})
export class FilterPanelComponent {
  jobService = inject(JobService);

  allJobs = this.jobService.allJobs;
  filteredJobs = this.jobService.filteredJobs;

  selectedFilters: SelectedFilters = {
    positionLevel: new Set<string>(),
    employmentType: new Set<string>(),
    workMode: new Set<string>(),
    salary: new Set<string>(),
    city: new Set<string>(),
    jobThemes: new Set<string>(),
  };

  levelOptions = computed(() => {
    let levels = this.allJobs().map((l) => l.positionLevel);
    return Array.from(new Set(levels)); // Set removes duplicates.
  });

  employmentTypeOptions = computed(() => {
    let employmentType = this.allJobs().map((et) => et.employmentType);
    return Array.from(new Set(employmentType));
  });

  workModeOptions = computed(() => {
    let workMode = this.allJobs().map((wm) => wm.workMode);
    return Array.from(new Set(workMode));
  });

  // TODO: Has duplicates.
  salaryOptions = computed(() => {
    let salary = this.allJobs().map((s) => s.salary);
    return Array.from(new Set(salary));
  });

  locationOptions = computed(() => {
    let location = this.allJobs().map((l) => l.city);
    return Array.from(new Set(location));
  });

  jobFieldOptions = computed(() => {
    let jobField = this.allJobs().map((jf) => jf.jobThemes);
    // Frontend Development,UI Quality,Team Collaboration
    return (
      Array.from(new Set(jobField))
        .map((f) => f.toString().split(','))
        // Frontend Development
        // UI Quality
        // Team Collaboration
        .flat()
    );
  });

  onFilterJobs(jobProperty: string, propertyCategorie: PropertyCategory) {
    console.log('onFilterJobs().');
    console.log('onFilterJobs()_jobProperty: ', jobProperty);
    console.log('onFilterJobs()_propertyCategorie: ', propertyCategorie);

    const selectedCategory = this.selectedFilters[propertyCategorie];
    if (selectedCategory.has(jobProperty)) {
      selectedCategory.delete(jobProperty);
    } else {
      selectedCategory.add(jobProperty);
    }
    console.log('onFilterJobs()_this.selectedFilters: ', this.selectedFilters);

    // OR inside each category, AND between categories.
    // Mental model: imagine one "bucket" (Set) per filter group.
    // A job must pass every non-empty bucket to stay in the result list.
    // `.filter(...)` builds a new array containing only jobs that return `true`.
    const selectedProperties = this.allJobs().filter((job) => {
      // `Object.keys(...)` returns strings; `as PropertyCategory[]` tells TypeScript
      // these keys are exactly our known categories.
      // `.every(...)` means: if one non-empty category fails, the entire job fails.
      // That is AND logic between categories.
      return (Object.keys(this.selectedFilters) as PropertyCategory[]).every((category) => {
        const selectedValues = this.selectedFilters[category];

        // No selected values in this category means "do not restrict by this category".
        if (selectedValues.size === 0) {
          return true;
        }

        if (category === 'jobThemes') {
          // `jobThemes` is an array, so we compare each theme and keep the job if at
          // least one selected theme matches (`some(...)` = OR logic within this category).
          const themes = job.jobThemes.map((theme) => theme.toString().trim());
          return themes.some((theme) => selectedValues.has(theme));
        }

        // For single-value fields (city, salary, etc.) we normalise the value to string
        // and check whether the selected Set contains it.
        const value = this.getComparableJobValue(job, category);
        return selectedValues.has(value);
      });
    });

    this.filteredJobs.set(selectedProperties);
    console.log('onFilterJobs()_this.filteredJobs(): ', this.filteredJobs());

    this.jobService.determinesAvailableJobLength(selectedProperties, '');
  }

  // `Exclude<...>` means this helper cannot be called with `jobThemes`.
  // Reason: `jobThemes` needs special array logic and is handled above.
  private getComparableJobValue(
    job: any,
    category: Exclude<PropertyCategory, 'jobThemes'>,
  ): string {
    const value = job[category];
    // `job[category]` is dynamic property access, e.g. job['city'] or job['workMode'].
    // Returning a string gives us one consistent type for Set comparison.
    return value === null || value === undefined ? '' : value.toString();
  }

  onResetFilters() {
    console.log('onResetFilters().');
    for (const selectedCategory of Object.values(this.selectedFilters)) {
      console.log('onResetFilters()_selectedCategory: ', selectedCategory);

      selectedCategory.clear();
    }

    const resetProperties = this.allJobs();
    this.filteredJobs.set(resetProperties);
    this.jobService.determinesAvailableJobLength(resetProperties, '');
  }

  isSelected(jobProperty: string, propertyCategory: PropertyCategory): boolean {
    return this.selectedFilters[propertyCategory].has(jobProperty);
  }
}
