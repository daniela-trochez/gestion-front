import { TestBed } from '@angular/core/testing';

import { TransaccionService } from './transaccion.service';

describe('TransacionService', () => {
  let service: TransaccionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaccionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
