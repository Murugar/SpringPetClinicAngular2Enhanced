

import {Component, OnInit} from '@angular/core';
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {Router, ActivatedRoute} from '@angular/router';
import {PetService} from '../../pets/pet.service';
import {Pet} from '../../pets/pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';


@Component({
  selector: 'app-visit-add',
  templateUrl: './visit-add.component.html',
  styleUrls: ['./visit-add.component.css']
})
export class VisitAddComponent implements OnInit {
  visit: Visit;
  current_pet: Pet;
  current_owner: Owner;
  current_pet_type: PetType;
  added_success: boolean = false;
  errorMessage: string;

  constructor(private visitService: VisitService, private petService: PetService, private router: Router, private route: ActivatedRoute) {
    this.visit = <Visit>{};
    this.current_pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_pet_type = <PetType>{};

  }

  ngOnInit() {
    console.log(this.route.parent);
    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      response => {
        this.current_pet = response;
        this.visit.pet = this.current_pet;
        this.current_pet_type = this.current_pet.type;
        this.current_owner = this.current_pet.owner;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(visit: Visit) {
    visit.id = null;
    var that = this;
    console.log(visit);
    this.visitService.addVisit(visit).subscribe(
      new_visit => {
        this.visit = new_visit;
        this.added_success = true;
        that.gotoOwnerDetail();
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
