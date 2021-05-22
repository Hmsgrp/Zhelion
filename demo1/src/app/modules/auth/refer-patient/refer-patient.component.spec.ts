import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferPatientComponent } from './refer-patient.component';

describe('ReferPatientComponent', () => {
  let component: ReferPatientComponent;
  let fixture: ComponentFixture<ReferPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
