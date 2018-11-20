import { TestBed } from '@angular/core/testing';

import { RadiusService } from './radius.service';

describe('RadiusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadiusService = TestBed.get(RadiusService);
    expect(service).toBeTruthy();
  });
});
