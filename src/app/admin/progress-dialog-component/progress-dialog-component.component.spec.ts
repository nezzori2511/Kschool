import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDialogComponentComponent } from './progress-dialog-component.component';

describe('ProgressDialogComponentComponent', () => {
  let component: ProgressDialogComponentComponent;
  let fixture: ComponentFixture<ProgressDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
