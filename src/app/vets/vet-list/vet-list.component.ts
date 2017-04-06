import {Component, OnInit, Input} from '@angular/core';
import {Vet} from '../vet';
import {VetService} from '../vet.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'app-vet-list',
    templateUrl: './vet-list.component.html',
    styleUrls: ['./vet-list.component.css']
})
export class VetListComponent implements OnInit {
    vets: Vet[];
    @Input() vet: Vet;
    errorMessage: string;
    response_status: number;
    delete_success: boolean = false;

    constructor( private router: Router, private vetService: VetService ) {
        this.vets = [];
        this.vet = <Vet>{};
    }

    ngOnInit() {
        this.vetService.getVets().subscribe(
            vets => this.vets = vets,
            error => this.errorMessage = <any>error );
    }

    addVet() {
        this.router.navigate( ['/vets/add'] );
    }
    
    getVets() {
        
        this.vetService.getVets().subscribe(
                vets => this.vets = vets,
                error => this.errorMessage = <any>error );
        this.router.navigate( ['/vets'] );
    }
   

    editVet( vet: Vet ) {
        this.router.navigate( ['/vets', vet.id, 'edit'] );
    }

    deleteVet( vet: Vet ) {
        this.vetService.deleteVet( vet.id.toString() ).subscribe(
            response => {
                this.response_status = response;
                if ( this.response_status === 204 ) {
                    this.delete_success = true;
                    this.vet = <Vet>{};
                }
            },
            error => this.errorMessage = <any>error );
        
        this.getVets(); 
    }

}
