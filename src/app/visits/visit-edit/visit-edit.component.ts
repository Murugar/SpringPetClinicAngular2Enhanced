
import {Component, OnInit} from '@angular/core';
import {Visit} from '../visit';
import {Pet} from '../../pets/pet';
import {Owner} from '../../owners/owner';
import {PetType} from '../../pettypes/pettype';
import {VisitService} from '../visit.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-visit-edit',
  templateUrl: './visit-edit.component.html',
  styleUrls: ['./visit-edit.component.css']
})
export class VisitEditComponent implements OnInit {
  visit: Visit;
  current_pet: Pet;
  current_owner: Owner;
  current_pet_type: PetType;
  update_success: boolean = false;
  errorMessage: string;

  constructor(private visitService: VisitService, private route: ActivatedRoute, private router: Router) {
    this.visit = <Visit>{};
    this.current_pet = <Pet>{};
    this.current_owner = <Owner>{};
    this.current_pet_type = <PetType>{};
  }

  ngOnInit() {
    const visitId = this.route.snapshot.params['id'];
    this.visitService.getVisitById(visitId).subscribe(
      response => {
        this.visit = response;
        this.current_pet = this.visit.pet;
        this.current_pet_type = this.current_pet.type;
        this.current_owner = this.current_pet.owner;
      },
      error => this.errorMessage = <any> error);
  }

  onSubmit(visit: Visit) {
    visit.pet = this.current_pet;
    var that = this;
    this.visitService.updateVisit(visit.id.toString(), visit).subscribe(
      get_result,
      error => this.errorMessage = <any> error);
    function get_result(update_status) {
      if (update_status.status === 204) {
        console.log('update success');
        that.gotoOwnerDetail();
      } else {
        return console.log('update failed');
      }
    }

  }

  gotoOwnerDetail() {
    this.router.navigate(['/owners', this.current_owner.id]);
  }

}
