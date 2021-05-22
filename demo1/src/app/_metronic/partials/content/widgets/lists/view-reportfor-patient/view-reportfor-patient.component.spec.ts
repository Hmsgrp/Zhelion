import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportforPatientComponent } from './view-reportfor-patient.component';

describe('ViewReportforPatientComponent', () => {
  let component: ViewReportforPatientComponent;
  let fixture: ComponentFixture<ViewReportforPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportforPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportforPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
