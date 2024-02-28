import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPayComponent } from './error-pay.component';

describe('ErrorPayComponent', () => {
  let component: ErrorPayComponent;
  let fixture: ComponentFixture<ErrorPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
