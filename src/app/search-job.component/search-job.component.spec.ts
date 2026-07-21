import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchJobComponent } from './search-job.component';

describe('SearchJobComponent', () => {
  let component: SearchJobComponent;
  let fixture: ComponentFixture<SearchJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchJobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchJobComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
