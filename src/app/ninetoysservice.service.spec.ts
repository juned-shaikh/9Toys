import { TestBed } from '@angular/core/testing';

import { NinetoysserviceService } from './ninetoysservice.service';

describe('NinetoysserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NinetoysserviceService = TestBed.get(NinetoysserviceService);
    expect(service).toBeTruthy();
  });
});
