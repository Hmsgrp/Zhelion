import { TestBed } from '@angular/core/testing';

import { AddRequestHeaderService } from './add-request-header.service';

describe('AddRequestHeaderService', () => {
  let service: AddRequestHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRequestHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
