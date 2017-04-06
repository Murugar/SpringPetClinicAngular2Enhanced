
import {TestBed, async, inject} from '@angular/core/testing';
import {VetService} from './vet.service';
import {HttpModule} from '@angular/http';

describe('VetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [VetService]
    });
  });

  it('should ...', inject([VetService], (service: VetService) => {
    expect(service).toBeTruthy();
  }));
});
