import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorNextStepComponent } from './doctor-next-step.component';

describe('DoctorNextStepComponent', () => {
  let component: DoctorNextStepComponent;
  let fixture: ComponentFixture<DoctorNextStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorNextStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorNextStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
