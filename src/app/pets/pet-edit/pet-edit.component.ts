
import {Component, OnInit, Input} from '@angular/core';
import {Pet} from '../pet';
import {PetService} from '../pet.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {PetTypeService} from '../../pettypes/pettype.service';


@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {
  pet: Pet;
  @Input() current_type: PetType;
  current_owner: Owner;
  pet_types: PetType[];
  errorMessage: string;

  constructor(private petService: PetService, private petTypeService: PetTypeService, private router: Router, private route: ActivatedRoute) {
    this.pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_type = <PetType>{};
    this.pet_types = [];
  }

  ngOnInit() {

    this.petTypeService.getPetTypes().subscribe(
      pettypes => this.pet_types = pettypes,
      error => this.errorMessage = <any> error);

    const petId = this.route.snapshot.params['id'];
    this.petService.getPetById(petId).subscribe(
      pet => {
        this.pet = pet;
        this.current_owner = this.pet.owner;
        this.current_type = this.pet.type;
      },
      error => this.errorMessage = <any> error);

  }

  onSubmit(pet: Pet) {
    pet.type = this.current_type;
    this.petService.updatePet(pet.id.toString(), pet).subscribe(
      get_result,
      error => this.errorMessage = <any> error
    );
    function get_result(update_status) {
      if (update_status.status === 204) {
        return console.log('update success');
      } else {
        return console.log('update failed');
      }
    }
    
    this.gotoOwnerDetail(this.current_owner);
    
  }

  gotoOwnerDetail(owner: Owner) {
    this.router.navigate(['/owners', owner.id]);
  }


}
