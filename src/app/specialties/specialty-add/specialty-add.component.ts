import { Component, OnInit } from '@angular/core';
import {Specialty} from '../specialty';
import {SpecialtyService} from '../specialty.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'app-specialty-add',
    templateUrl: './specialty-add.component.html',
    styleUrls: ['./specialty-add.component.css']
})
export class SpecialtyAddComponent implements OnInit {

    specialties: Specialty[];
    errorMessage: string;
    response_status: number;
   
    is_insert: boolean = true;

    specialty: Specialty;

    constructor( private specService: SpecialtyService, private router: Router ) {
        this.specialty = <Specialty>{};
    }

    ngOnInit() {
    }

    
    gotoHome() {
        this.router.navigate(['/welcome']);
    }
    
    
    addSpecialty( specialty: Specialty ) {

        this.specService.addSpecialty( specialty ).subscribe(
            ( response: any ) => {
                if ( response.status === 204 ) {
                    console.log( 'add success' );
                } else {
                    console.log( 'insert incomplete, response status: ' + response.status );
                }
            },
            error => {
                console.log( 'error catched' );
                console.log( error );
                return this.errorMessage = <any>error;
            });
    }


}
