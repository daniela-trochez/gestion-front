import { TestBed } from '@angular/core/testing';

import { TokenServiceTsService } from './token.service.ts.service';

describe('TokenServiceTsService', () => {
  let service: TokenServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
