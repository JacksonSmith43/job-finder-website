import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { SearchJobComponent } from './search-job.component';
import { JobService } from '../shared/services/job.service';
import { JobType } from '../shared/model/job-type.model';

// This is fixed mock data used by tests so assertions are deterministic.
// Using fixed data avoids network calls and keeps tests fast and predictable.
const mockJobs: JobType[] = [
  {
    id: 1,
    name: 'Angular Developer',
    techStack: ['Angular', 'Git'],
    company: 'Bug Busters Inc.',
    description: 'Builds Angular apps.',
    city: 'Berlin',
    positionLevel: 'Junior',
    employmentType: 'Part Time',
    workMode: 'Homeoffice',
    salary: 'From 49k €',
    companyLogo: 'bug-busters.png',
    isAvailable: true,
  },
  {
    id: 2,
    name: 'Java Developer',
    techStack: ['Java', 'Spring Boot'],
    company: 'Infinite Loopers',
    description: 'Builds Java services.',
    city: 'Vienna',
    positionLevel: 'Mid-Level',
    employmentType: 'Full-Time',
    workMode: 'Hybrid',
    salary: 'From 48k €',
    companyLogo: 'infinite-loopers.png',
    isAvailable: true,
  },
  {
    id: 3,
    name: 'UX Designer',
    techStack: ['Figma'],
    company: 'Syntax Tacos',
    description: 'Designs product interfaces.',
    city: 'Tokyo',
    positionLevel: 'Senior',
    employmentType: 'Full-Time',
    workMode: 'Onsite',
    salary: 'From 30k €',
    companyLogo: 'syntax-tacos.png',
    isAvailable: true,
  },
];

class MockJobService {
  // Angular signals store reactive state in the same style as the real service.
  allJobs = signal<JobType[]>([...mockJobs]);
  filteredJobs = signal<JobType[]>([]);

  // vi.fn creates a spy function, so tests can verify whether loadJobs was called.
  // This mock method also resets both signals to mirror production behaviour.
  loadJobs = vi.fn(() => {
    this.allJobs.set([...mockJobs]);
    this.filteredJobs.set([...mockJobs]);
  });
}

// describe groups related tests into one suite shown in test reports.
describe('SearchJobComponent', () => {
  // component is the class instance under test.
  let component: SearchJobComponent;
  // fixture wraps the rendered component + DOM + change detection helpers.
  let fixture: ComponentFixture<SearchJobComponent>;
  // mock service injected instead of the real JobService.
  let jobService: MockJobService;

  // beforeEach runs before every test case to create a clean test state.
  beforeEach(async () => {
    jobService = new MockJobService();

    // TestBed is Angular's test environment builder.
    // configureTestingModule creates an isolated module for this test run.
    await TestBed.configureTestingModule({
      // imports registers standalone components/directives/pipes used in tests.
      imports: [SearchJobComponent],
      // providers overrides DI tokens with test doubles.
      providers: [{ provide: JobService, useValue: jobService }],
    })
      // overrideComponent changes component metadata only for tests.
      // We replace external template/style files with inline ones for stability.
      .overrideComponent(SearchJobComponent, {
        set: {
          // Inline template avoids external resource resolution differences across runners.
          // It also keeps this unit test focused on component logic, not full UI layout.
          template: `
            <form [formGroup]="form">
              <input formControlName="userInput" />
            </form>
            <p id="error-message">{{ inputIsValid }}</p>
          `,
          // Empty styles are enough here because style rendering is not under test.
          styles: [''],
        },
      })
      // compileComponents prepares the component for creation and template binding.
      .compileComponents();

    // createComponent instantiates the component and links it with a test DOM host.
    fixture = TestBed.createComponent(SearchJobComponent);
    // componentInstance gives direct access to class methods/properties.
    component = fixture.componentInstance;
    // detectChanges triggers Angular change detection once (similar to initial render).
    fixture.detectChanges();
    // whenStable waits for pending async tasks before assertions run.
    await fixture.whenStable();
  });

  // Basic smoke test to confirm creation didn't throw and DI is wired.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ensures component ngOnInit called the service load method exactly once.
  it('should call loadJobs on init', () => {
    expect(jobService.loadJobs).toHaveBeenCalledTimes(1);
  });

  // Group of tests that validates reactive form rules and invalid-flow behaviour.
  describe('SearchJobComponent_Form validation', () => {
    it('should set invalid input message for required', () => {
      // Simulate user input state in the reactive form control.
      component.form.controls.userInput.setValue('');
      component.form.controls.userInput.markAsTouched();

      // inputIsValid is a getter that returns the correct validation message.
      expect(component.inputIsValid).toBe('An input is required.');
    });

    it('should set invalid input message for minlength', () => {
      component.form.controls.userInput.setValue('a');
      component.form.controls.userInput.markAsTouched();

      expect(component.inputIsValid).toBe('The input has to at least contain 2 characters.');
    });

    it('should keep result hidden on invalid submit', () => {
      // Form state: invalid because value is empty.
      component.form.controls.userInput.setValue('');
      // onSubmit takes an HTMLInputElement, so we pass a real DOM input element.
      const input = document.createElement('input');
      input.value = '';

      // Call the same method your template triggers on submit.
      component.onSubmit(input);

      // Invalid submit should not show result section.
      expect(component.isVisible()).toBe(false);
    });
  });

  // Verifies lookup helper for known and unknown tech names.
  it('should return known logo and fallback for unknown tech', () => {
    expect(component.getTechLogo('Angular')).toBe('angular.png');
    expect(component.getTechLogo('UnknownTech')).toBe('default-tech.png');
  });

  // Verifies UI chip model generation from a JobType object.
  it('should create structured info chips for a job', () => {
    const infoItems = component.getJobInfoItems(mockJobs[0]);

    // toEqual checks deep structural equality (objects/arrays by value).
    expect(infoItems).toEqual([
      { label: 'Level', value: 'Junior' },
      { label: 'City', value: 'Berlin' },
      { label: 'Salary', value: 'From 49k €' },
      { label: 'Employment Type', value: 'Part Time' },
      { label: 'Work Mode', value: 'Homeoffice' },
    ]);
  });

  // Group of tests that validates search and chip-based filter behaviour.
  describe('SearchJobComponent_Filter', () => {
    it('should filter jobs by search term and announce result count', () => {
      // Keep reactive form and native input consistent with submitted value.
      component.form.controls.userInput.setValue('angular');
      const input = document.createElement('input');
      input.value = 'angular';

      component.onSubmit(input);

      // Map jobs to ids so assertion is stable and concise.
      expect(component.filteredJobs().map((job) => job.id)).toEqual([1]);
      // Result panel should be visible on valid submit.
      expect(component.isVisible()).toBe(true);
      // Live-region text for accessibility feedback.
      expect(component.searchAnnouncement()).toBe('1 position found.');
      // toBeNull confirms the form control was reset after submit.
      expect(component.form.controls.userInput.value).toBeNull();
    });

    it('should announce no positions found', () => {
      component.form.controls.userInput.setValue('nonexistentkeyword');
      const input = document.createElement('input');
      input.value = 'nonexistentkeyword';

      component.onSubmit(input);

      // No result means empty filtered list.
      expect(component.filteredJobs()).toHaveLength(0);
      // Announcement should communicate zero-result state.
      expect(component.searchAnnouncement()).toBe('No positions found.');
    });

    it('should filter by tech stack chip click handler', () => {
      // Simulate clicking a tech chip and verify resulting job set.
      component.onFilterTechStack('Figma');

      expect(component.filteredJobs().map((job) => job.id)).toEqual([3]);
    });

    it('should filter by job info chip click handler', () => {
      // Simulate clicking a job info chip and verify resulting job set.
      component.onFilterJobInfo({ label: 'City', value: 'Vienna' });

      expect(component.filteredJobs().map((job) => job.id)).toEqual([2]);
    });
  });

  // Validates rendered error text in the DOM, not just component getter values.
  it('should render search error message when input is invalid and touched', () => {
    component.form.controls.userInput.setValue('');
    component.form.controls.userInput.markAsTouched();
    // Re-render template after changing component/form state.
    fixture.detectChanges();

    // nativeElement is the root DOM node of this test component.
    const compiled = fixture.nativeElement as HTMLElement;
    const error = compiled.querySelector('#error-message');

    expect(error?.textContent).toContain('An input is required.');
  });
});
