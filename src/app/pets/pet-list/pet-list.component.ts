
import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import {PetService} from '../pet.service';
import {Pet} from '../pet';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  errorMessage: string;
  @Input() pet: Pet;
  response_status: number;
  delete_success: boolean = false;

  constructor(private router: Router, private petService: PetService) {
    this.pet = <Pet>{};
  }

  ngOnInit() {
    // this.petService.getPets().subscribe(
    //   response => this.pets = response,
    //   error => this.errorMessage = <any> error);
  }

  editPet(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'edit']);
  }

  deletePet(pet: Pet) {
    this.petService.deletePet(pet.id.toString()).subscribe(
      response => {
        this.response_status = response;
        if (this.response_status === 204) {
          this.delete_success = true;
          this.pet = <Pet>{};
        }
      },
      error => this.errorMessage = <any> error);
  }

  addVisit(pet: Pet) {
    this.router.navigate(['/pets', pet.id, 'visits', 'add']);
  }

}
