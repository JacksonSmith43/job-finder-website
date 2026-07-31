import { Routes } from '@angular/router';

import { SearchJobComponent } from './search-job/search-job.component';
import { ResumeComponent } from './resume/resume.component';
import { JobAlertComponent } from './job-alert/job-alert.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { YourJobsComponent } from './your-jobs/your-jobs.component';

export const routes: Routes = [
  { path: '', component: SearchJobComponent },
  { path: 'homepage', component: SearchJobComponent },
  { path: 'yourJobs', component: YourJobsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'jobAlert', component: JobAlertComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
