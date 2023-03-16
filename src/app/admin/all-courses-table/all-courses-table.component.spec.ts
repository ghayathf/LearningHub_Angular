import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesTableComponent } from './all-courses-table.component';

describe('AllCoursesTableComponent', () => {
  let component: AllCoursesTableComponent;
  let fixture: ComponentFixture<AllCoursesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCoursesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCoursesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
