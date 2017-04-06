
import {TestBed, async, inject} from '@angular/core/testing';
import {VisitService} from './visit.service';
import {HttpModule} from '@angular/http';

describe('VisitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [VisitService]
    });
  });

  it('should ...', inject([VisitService], (service: VisitService) => {
    expect(service).toBeTruthy();
  }));
});
