import { TestBed } from '@angular/core/testing';

import { RegisterProductService } from './register.service';

describe('RegisterProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterProductService = TestBed.get(RegisterProductService);
    expect(service).toBeTruthy();
  });
});
