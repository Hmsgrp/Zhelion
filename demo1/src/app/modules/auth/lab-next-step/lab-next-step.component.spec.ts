import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabNextStepComponent } from './lab-next-step.component';

describe('LabNextStepComponent', () => {
  let component: LabNextStepComponent;
  let fixture: ComponentFixture<LabNextStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabNextStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabNextStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
