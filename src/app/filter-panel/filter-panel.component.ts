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
}
