import { TestBed } from '@angular/core/testing';

import { MiniatureService } from './miniature.service';

describe('MiniatureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MiniatureService = TestBed.get(MiniatureService);
    expect(service).toBeTruthy();
  });
});
