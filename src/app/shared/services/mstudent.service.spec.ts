import { TestBed } from '@angular/core/testing';

import { MstudentService } from './mstudent.service';

describe('MstudentService', () => {
  let service: MstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
