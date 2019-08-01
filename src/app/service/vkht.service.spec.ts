import { TestBed, inject } from '@angular/core/testing';

import { VkhtService } from './vkht.service';

describe('VkhtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VkhtService]
    });
  });

  it('should be created', inject([VkhtService], (service: VkhtService) => {
    expect(service).toBeTruthy();
  }));
});
