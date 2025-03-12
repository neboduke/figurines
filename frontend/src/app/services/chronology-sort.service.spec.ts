import { TestBed } from '@angular/core/testing';

import { ChronologySortService } from './chronology-sort.service';

describe('ChronologySortService', () => {
  let service: ChronologySortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronologySortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
