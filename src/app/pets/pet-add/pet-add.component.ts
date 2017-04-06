
import {Component, OnInit, Input} from '@angular/core';
import {Pet} from '../pet';
import {PetType} from '../../pettypes/pettype';
import {Owner} from '../../owners/owner';
import {ActivatedRoute, Router} from '@angular/router';
import {PetTypeService} from '../../pettypes/pettype.service';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';

@Component({
  selector: 'app-pet-add',
  templateUrl: './pet-add.component.html',
  styleUrls: ['./pet-add.component.css']
})
export class PetAddComponent implements OnInit {
  pet: Pet;
  @Input() current_type: PetType;
  current_owner: Owner;
  pet_types: PetType[];
  added_success: boolean = false;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private petService: PetService,
              private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_type = <PetType>{};
    this.pet_types = [];
  }

  ngOnInit() {
    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.pet_types = pettypes,
      error => this.errorMessage = <any> error);

    const ownerId = this.route.snapshot.params['id'];
    this.ownerService.getOwnerById(ownerId).subscribe(
      response => {
        this.current_owner = response;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(pet: Pet) {
    pet.id = null;
    pet.owner = this.current_owner;
    this.petService.addPet(pet).subscribe(
      new_pet => {
        this.pet = new_pet;
        this.added_success = true;
      },
      error => this.errorMessage = <any>error);
      this.router.navigate(['/owners', this.current_owner.id]);
  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
