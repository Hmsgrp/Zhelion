import { TestBed } from '@angular/core/testing';

import { DashboardServicsService } from './dashboard-servics.service';

describe('DashboardServicsService', () => {
  let service: DashboardServicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardServicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
