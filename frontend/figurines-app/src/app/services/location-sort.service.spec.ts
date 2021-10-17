import { TestBed } from '@angular/core/testing';

import { LocationSortService } from './location-sort.service';

describe('LocationSortService', () => {
  let service: LocationSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
