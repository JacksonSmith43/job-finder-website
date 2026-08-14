import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAlertComponent } from './job-alert.component';

describe('JobAlertComponent', () => {
  let component: JobAlertComponent;
  let fixture: ComponentFixture<JobAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobAlertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobAlertComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
