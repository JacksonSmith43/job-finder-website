import { Component, computed, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';

import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [MatExpansionModule, FormsModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.css',
})
export class FilterPanelComponent {
  jobService = inject(JobService);

  allJobs = this.jobService.allJobs;
  filteredJobs = this.jobService.filteredJobs;

  // Currently selected values per filter category, e.g. { workMode: Set('Hybrid', 'Onsite') }.
  selectedWorkModes = new Set<string>();

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

  onFilterJobs(jobProperty: string, propertyCategorie: string) {
    console.log('onFilterJobs().');
    console.log('onFilterJobs()_jobProperty: ', jobProperty);
    console.log('onFilterJobs()_this.selectedWorkModes: ', this.selectedWorkModes);

    if (propertyCategorie === 'workMode') {
      if (this.selectedWorkModes.has(jobProperty)) {
        this.selectedWorkModes.delete(jobProperty);

      } else {
        this.selectedWorkModes.add(jobProperty);
      }
    }

    // No checkbox selected shows all jobs, otherwise OR-match against the selected values.
    const selectedProperties =
      this.selectedWorkModes.size === 0
        ? this.allJobs()
        : this.allJobs().filter((job) => this.selectedWorkModes.has(job.workMode));

    this.filteredJobs.set(selectedProperties);
    console.log('onFilterJobs()_this.filteredJobs(): ', this.filteredJobs());

    this.jobService.determinesAvailableJobLength(selectedProperties, '');
  }
}
