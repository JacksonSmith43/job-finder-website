import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { JobService } from '../shared/services/job.service';
import { JobInfoItem, JobType } from '../shared/model/job-type.model';

@Component({
  selector: 'app-search-job.component',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor, FormsModule, ReactiveFormsModule],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css',
})
export class SearchJobComponent implements OnInit {
  jobService = inject(JobService);

  isVisible = signal<boolean>(false);

  allJobs = this.jobService.allJobs;
  filteredJobs = this.jobService.filteredJobs;

  jobsLength = computed(() => this.filteredJobs().length);

  form = new FormGroup({
    userInput: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(80),
    ]),
  });

  readonly techStack: Record<string, string> = {
    Angular: 'angular.png',
    C: 'c.png',
    'C++': 'c++.png',
    CSS: 'css.png',
    Docker: 'docker.png',
    Git: 'git.png',
    HTML: 'html.png',
    Java: 'java.png',
    JavaScript: 'js.png',
    Python: 'python.png',
    React: 'react.png',
    'Spring Boot': 'spring-boot.png',
    Adobe: 'adobe.png',
    Atlassian: 'atlassian.png',
    Claude: 'claude.png',
    Confluence: 'confluence.png',
    'Embedded C': 'embedded-c.png',
    Figma: 'figma.png',
    I2C: 'i2c.png',
    Jira: 'jira.png',
    SPI: 'spi.png',
    STM32: 'stm32.png',
    UART: 'uart.png',
    Zephyr: 'zephyr.png',
  };

  ngOnInit(): void {
    console.log('SearchJobComponent_ngOnInit().');
    this.jobService.loadJobs();
  }

  onSubmit(enteredInput: HTMLInputElement): void {
    console.log('SearchJobComponent_onSubmit().');

    if (!this.form.controls.userInput.valid) {
      this.isVisible.set(false);
      return;
    }

    let userInput = enteredInput.value.toLowerCase().trim();

    console.log('SearchJobComponent_onSubmit()_userInput: ', userInput);
    console.log('SearchJobComponent_onSubmit()_this.jobs(): ', this.allJobs());

    let filteredInput = this.allJobs().filter(
      (j) =>
        j.name.toLowerCase().includes(userInput) ||
        j.techStack.some((tech) => tech.toLowerCase().includes(userInput)) ||
        j.company.toLowerCase().includes(userInput) ||
        j.city.toLowerCase().includes(userInput),
    );
    this.filteredJobs.set(filteredInput);
    console.log('SearchJobComponent_onSubmit()_filteredInput: ', filteredInput);

    this.isVisible.set(true);
    this.form.reset();
  }

  getTechLogo(tech: string): string {
    return this.techStack[tech] ?? 'default-tech.png';
  }

  getJobInfoItems(job: JobType): JobInfoItem[] {
    return [
      { label: 'Level', value: job.positionLevel },
      { label: 'City', value: job.city },
      { label: 'Salary', value: job.salary },
      { label: 'Employment Type', value: job.employmentType },
      { label: 'Work Mode', value: job.workMode },
    ];
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
  }

  onFilterJobInfo(info: JobInfoItem) {
    console.log('onFilterJobInfo().');
    console.log('onFilterJobInfo()_info: ', info);

    let filteredJobInfo: boolean[] = this.allJobs().map(
      (job) =>
        job.city.includes(info.value) ||
        job.employmentType.includes(info.value) ||
        job.positionLevel.includes(info.value) ||
        job.salary.includes(info.value) ||
        job.workMode.includes(info.value),
    );
    console.log('onFilterJobInfo()_filteredJobInfo: ', filteredJobInfo);

    this.filteredJobs.set(this.allJobs().filter((job, index) => filteredJobInfo[index]));
    console.log('onFilterJobInfo()_this.filteredJobs(): ', this.filteredJobs());
  }

  get inputIsValid() {
    if (this.form.controls.userInput.hasError('required')) {
      return 'An input is required.';
    } else if (this.form.controls.userInput.hasError('minlength')) {
      return 'The input has to at least contain 2 characters.';
    } else if (this.form.controls.userInput.hasError('maxlength')) {
      return 'The input only allows a maximum of 80 characters.';
    } else {
      return 'Some other issue.';
    }
  }
}
