import { TestBed } from '@angular/core/testing';

import { AsingMenuService } from './asing-menu.service';

describe('AsingMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsingMenuService = TestBed.get(AsingMenuService);
    expect(service).toBeTruthy();
  });
});
