import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerModule } from 'primeng/datepicker';

import { LocalStorageService } from '../shared/services/local-storage.service';
import { JobService } from '../shared/services/job.service';
import { JobType } from '../shared/model/job-type.model';

@Component({
  selector: 'app-application-page',
  standalone: true,
  imports: [
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    DatePickerModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  templateUrl: './application-page.component.html',
  styleUrl: './application-page.component.css',
})
export class ApplicationPageComponent implements OnInit {
  localStorageService = inject(LocalStorageService);
  jobService = inject(JobService);

  currentJob = this.jobService.currentJob;

  ngOnInit(): void {
    console.log('ApplicationPageComponent_ngOnInit().');

    let applySelectedJob = this.localStorageService.getFromLocalStorage('applyForSelectedJob');
    this.currentJob.set(applySelectedJob as JobType);
  }
}
