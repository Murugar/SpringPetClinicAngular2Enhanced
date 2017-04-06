import {Component, OnInit, Input} from '@angular/core';
import {Vet} from '../vet';
import {ActivatedRoute, Router} from '@angular/router';
import {VetService} from '../vet.service';
import {SpecialtyService} from '../../specialties/specialty.service';
import {Specialty} from '../../specialties/specialty';

@Component( {
    selector: 'app-vet-edit',
    templateUrl: './vet-edit.component.html',
    styleUrls: ['./vet-edit.component.css']
})
export class VetEditComponent implements OnInit {

    vets: Vet[];
    vet: Vet;
    errorMessage: string;
    added_success: boolean = false;
    specialties1: Specialty[];

    constructor( private vetService: VetService, private specService: SpecialtyService, private router: Router,
        private route: ActivatedRoute ) {
        this.vet = <Vet>{};
        this.vets = [];
    }

    ngOnInit() {
        
        
        this.specService.getSpecialties().subscribe(
                pettypes => this.specialties1 = pettypes,
                error => this.errorMessage = <any> error);
        
        const vetId = this.route.snapshot.params['id'];
        this.vetService.getVetById(vetId).subscribe(
          vet => this.vet = vet,
         // pettypes => this.specialties = pettypes,
          error => this.errorMessage = <any> error);    
    
    }

    onSubmit( vet: Vet ) {

        this.vetService.updateVet( vet.id.toString(), vet ).subscribe(
            get_result,
            error => this.errorMessage = <any>error
        );
        function get_result( update_status ) {
            if ( update_status.status === 204 ) {
                return console.log( 'update success' );
            } else {
                return console.log( 'update failed' );
            }
        }

        this.gotoVetsList(); 

    }

    gotoVetsList() {
        
        this.vetService.getVets().subscribe(
                vets => this.vets = vets,
                error => this.errorMessage = <any>error );
        this.router.navigate( ['/vets'] );
    }

}
