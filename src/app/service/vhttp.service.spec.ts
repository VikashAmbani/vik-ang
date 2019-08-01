import { TestBed, inject } from '@angular/core/testing';

import { VhttpService } from './vhttp.service';

describe('VhttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VhttpService]
    });
  });

  it('should be created', inject([VhttpService], (service: VhttpService) => {
    expect(service).toBeTruthy();
  }));
});
