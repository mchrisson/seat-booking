import { TestBed } from '@angular/core/testing';

import { SeatsDataService } from './seats-data.service';

describe('SeatsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeatsDataService = TestBed.get(SeatsDataService);
    expect(service).toBeTruthy();
  });
});
