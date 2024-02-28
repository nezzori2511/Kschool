import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressCourseComponent } from './progress-course.component';

describe('ProgressCourseComponent', () => {
  let component: ProgressCourseComponent;
  let fixture: ComponentFixture<ProgressCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
