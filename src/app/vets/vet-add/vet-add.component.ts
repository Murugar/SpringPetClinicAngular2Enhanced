import {Component, OnInit, Input} from '@angular/core';
import {Vet} from '../vet';
import {ActivatedRoute, Router} from '@angular/router';
import {VetService} from '../vet.service';
import {SpecialtyService} from '../../specialties/specialty.service';
import {Specialty} from '../../specialties/specialty';

@Component( {
    selector: 'app-vet-add',
    templateUrl: './vet-add.component.html',
    styleUrls: ['./vet-add.component.css']
})
export class VetAddComponent implements OnInit {

    vets: Vet[];
    vet: Vet;
    errorMessage: string;
    added_success: boolean = false;
    specialties: Specialty[];

    constructor(private vetService: VetService, private specService: SpecialtyService, private router: Router, 
            private route: ActivatedRoute) {
        this.vet = <Vet>{};
        this.vets = [];
    }
    

    ngOnInit() {
        this.specService.getSpecialties().subscribe(
               pettypes => this.specialties = pettypes,
               error => this.errorMessage = <any> error);
    
    }
    
    onSubmit(vet: Vet) {
        vet.id = null;
        this.vetService.addVet(vet).subscribe(
          new_vet => {
            this.vet = new_vet;
            this.added_success = true;
            this.gotoVetsList();
          },
          error => this.errorMessage = <any>error);
          this.gotoVetsList();
    }

    gotoVetsList() {
        
        this.vetService.getVets().subscribe(
                vets => this.vets = vets,
                error => this.errorMessage = <any>error );
        this.router.navigate(['/vets']);
    }

}
