

import {TestBed, async, inject} from '@angular/core/testing';
import {PetService} from './pet.service';
import {HttpModule} from '@angular/http';

describe('PetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PetService]
    });
  });

  it('should ...', inject([PetService], (service: PetService) => {
    expect(service).toBeTruthy();
  }));
});
