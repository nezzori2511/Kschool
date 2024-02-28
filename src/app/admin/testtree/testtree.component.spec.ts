import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesttreeComponent } from './testtree.component';

describe('TesttreeComponent', () => {
  let component: TesttreeComponent;
  let fixture: ComponentFixture<TesttreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TesttreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesttreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
