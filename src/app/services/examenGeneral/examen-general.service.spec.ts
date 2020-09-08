import { TestBed } from '@angular/core/testing';

import { ExamenGeneralService } from './examen-general.service';

describe('ExamenGeneralService', () => {
  let service: ExamenGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamenGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
