

import {TestBed, async, inject} from '@angular/core/testing';
import {PetTypeService} from './pettype.service';
import {HttpModule} from '@angular/http';

describe('PetTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [PetTypeService]
    });
  });

  it('should ...', inject([PetTypeService], (service: PetTypeService) => {
    expect(service).toBeTruthy();
  }));
});
