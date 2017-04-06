

import {Component, OnInit} from '@angular/core';
import {Specialty} from '../specialty';
import {SpecialtyService} from '../specialty.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {
  specialties: Specialty[];
  errorMessage: string;
  response_status: number;
  is_edit: boolean = false;
  is_insert: boolean = false;
  current_state: string = 'Edit';


  constructor(private specService: SpecialtyService, private router: Router) {
    this.specialties = [];
  }

  ngOnInit() {

    this.specService.getSpecialties().subscribe(
      specialties => this.specialties = specialties,
      error => this.errorMessage = <any> error);
  }

  gotoHome() {
    this.router.navigate(['/welcome']);
  }

  addSpecialty(specialty: Specialty) {
    if (this.is_insert) {

      this.is_insert = false;
    } else {
      this.is_insert = true;
    }

  }

  editSpecialty(specialty: Specialty) {
    if (this.is_edit) {
      this.specService.updateSpecialty(specialty.id.toString(), specialty).subscribe(
        (response: any) => {
          if (response.status === 204) {
            console.log('update success');
            this.is_edit = false;
            this.current_state = 'Edit';
          } else {
            console.log('update uncomplete, response status: ' + response.status);
            this.is_edit = false;
            this.current_state = 'Edit';
          }
        },
        error => {
          console.log('error catched');
          console.log(error);
          return this.errorMessage = <any> error;
        });
    } else {
      this.is_edit = true;
      this.current_state = 'Update';
    }
  }

  deleteSpecialty(specialty: Specialty) {
    this.specService.deleteSpecialty(specialty.id.toString()).subscribe(
      response => {
        this.response_status = response;
        if (this.response_status === 204) {
          this.specialties = this.specialties.filter(current_item => !(current_item.id === specialty.id));
        }
      },
      error => this.errorMessage = <any> error);
  }


}
