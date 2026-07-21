import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-search-job.component',
  imports: [MatFormFieldModule, MatInputModule, MatAnchor],
  templateUrl: './search-job.component.html',
  styleUrl: './search-job.component.css',
})
export class SearchJobComponent {
  onSubmit() {
    console.log('SearchJobComponent_onSubmit().');
  }
}
