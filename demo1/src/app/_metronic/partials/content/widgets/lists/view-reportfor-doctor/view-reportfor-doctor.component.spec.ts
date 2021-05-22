import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportforDoctorComponent } from './view-reportfor-doctor.component';

describe('ViewReportforDoctorComponent', () => {
  let component: ViewReportforDoctorComponent;
  let fixture: ComponentFixture<ViewReportforDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportforDoctorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportforDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
