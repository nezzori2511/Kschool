import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostTeacherManagementComponent } from './cost-teacher-management.component';

describe('CostTeacherManagementComponent', () => {
  let component: CostTeacherManagementComponent;
  let fixture: ComponentFixture<CostTeacherManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostTeacherManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostTeacherManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
