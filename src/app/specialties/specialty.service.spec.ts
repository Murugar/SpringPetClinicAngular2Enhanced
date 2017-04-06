
import {TestBed, async, inject} from '@angular/core/testing';
import {SpecialtyService} from './specialty.service';
import {HttpModule} from '@angular/http';

describe('SpecialtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [SpecialtyService]
    });
  });

  it('should ...', inject([SpecialtyService], (service: SpecialtyService) => {
    expect(service).toBeTruthy();
  }));
});
