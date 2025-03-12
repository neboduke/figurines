import { TestBed } from '@angular/core/testing';

import { LiteratureSortService } from './literature-sort.service';

describe('LiteratureSortService', () => {
  let service: LiteratureSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiteratureSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
