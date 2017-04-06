

import {Component, OnInit, Input} from '@angular/core';
import {Visit} from '../visit';
import {VisitService} from '../visit.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.css']
})
export class VisitListComponent implements OnInit {

  @Input() visits: Visit[];
  response_status: number;
  no_visits: boolean = false;
  errorMessage: string;

  constructor(private router: Router, private visitService: VisitService) {
    this.visits = [];
  }

  ngOnInit() {
  }

  editVisit(visit: Visit) {
    this.router.navigate(['/visits', visit.id, 'edit']);
  }

  deleteVisit(visit: Visit) {
    this.visitService.deleteVisit(visit.id.toString()).subscribe(
      response => {
        this.response_status = response;
        if (this.response_status === 204) {
          console.log('delete success');
          this.visits.splice(this.visits.indexOf(visit), 1 );
          if (this.visits.length === 0) {
            this.no_visits = true;
          }
        }
      },
      error => this.errorMessage = <any> error);
  }

}
