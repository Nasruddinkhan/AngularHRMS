import { TestBed } from '@angular/core/testing';

import { ToeknInterceptorService } from './toekn-interceptor.service';

describe('ToeknInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToeknInterceptorService = TestBed.get(ToeknInterceptorService);
    expect(service).toBeTruthy();
  });
});
