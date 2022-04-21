import { TestBed } from '@angular/core/testing';

import { RevinewService } from './revinew.service';

describe('RevinewService', () => {
  let service: RevinewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevinewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
