
import {TestBed, async, inject} from '@angular/core/testing';
import {OwnerService} from './owner.service';
import {environment} from 'environments/environment';
import {HttpModule} from '@angular/http';

describe('OwnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [OwnerService]
    });
  });

  it('should ...', inject([OwnerService], (service: OwnerService) => {
    expect(service).toBeTruthy();
  }));
});
