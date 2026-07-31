import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { JobService } from '../shared/services/job.service';

@Component({
  selector: 'app-navbar',
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class Navbar {
  jobService = inject(JobService);

  onHomepage(): void {
    console.log('Navbar_onHomepage().');
    this.jobService.loadJobs();
    this.jobService.determinesAvailableJobLength(this.jobService.allJobs(), '');
  }

  onYourJobs() {
    console.log('Navbar_onYourJobs().');
  }

  onResume() {
    console.log('Navbar_onResume().');
  }

  onJobAlert() {
    console.log('Navbar_onJobAlert().');
  }

  onSignUp() {
    console.log('Navbar_onSignUp().');
  }

  onLogin() {
    console.log('Navbar_onLogin().');
  }

  onRegister() {
    console.log('Navbar_onRegister().');
  }
}
