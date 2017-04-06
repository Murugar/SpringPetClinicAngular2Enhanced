import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {PetEditComponent} from './pet-edit.component';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';
import {PetTypeService} from '../../pettypes/pettype.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterStub, ActivatedRouteStub} from '../../testing/router-stubs';
import {Pet} from '../pet';
import Spy = jasmine.Spy;
import {Observable} from 'rxjs';

describe('PetEditComponent', () => {
  let component: PetEditComponent;
  let fixture: ComponentFixture<PetEditComponent>;
  let petService: PetService;
  let testPet: Pet;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, HttpModule],
      providers: [
        PetService, OwnerService, PetTypeService,
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetEditComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      owner: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        address: '110 W. Liberty St.',
        city: 'Madison',
        telephone: '6085551023',
        pets: null
      },
      visits: null
    };
    petService = fixture.debugElement.injector.get(PetService);
    spy = spyOn(petService, 'updatePet')
      .and.returnValue(Observable.of(testPet));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
