
import {Component, OnInit} from '@angular/core';
import {OwnerService} from '../owner.service';
import {Owner} from '../owner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-add',
  templateUrl: './owner-add.component.html',
  styleUrls: ['./owner-add.component.css']
})
export class OwnerAddComponent implements OnInit {

  owner: Owner;
  errorMessage: string;

  constructor(private ownerService: OwnerService, private router: Router) {
    this.owner = <Owner>{};
  }

  ngOnInit() {
  }

  onSubmit(owner: Owner) {
    owner.id = null;
    this.ownerService.addOwner(owner).subscribe(
      new_owner => {
        this.owner = new_owner;
        this.gotoOwnersList();
      },
      error => this.errorMessage = <any>error
    );
  }

  gotoOwnersList() {
    this.router.navigate(['/owners']);
  }

}
