import { TestBed } from '@angular/core/testing';

import { SkillelementService } from './skillelement.service';

describe('SkillelementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillelementService = TestBed.get(SkillelementService);
    expect(service).toBeTruthy();
  });
});
