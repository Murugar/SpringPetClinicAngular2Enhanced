
import {VisitsRoutingModule} from './visits-routing.module';
import {CommonModule} from '@angular/common';
import {VisitListComponent} from './visit-list/visit-list.component';
import {VisitEditComponent} from './visit-edit/visit-edit.component';
import {NgModule} from '@angular/core';
import {VisitService} from './visit.service';
import {VisitAddComponent} from './visit-add/visit-add.component';
import {FormsModule} from '@angular/forms';
import {PetsRoutingModule} from '../pets/pets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VisitsRoutingModule,
    PetsRoutingModule
  ],
  declarations: [
    VisitListComponent,
    VisitEditComponent,
    VisitAddComponent
  ],
  exports: [
    VisitListComponent,
    VisitEditComponent,
    VisitAddComponent
  ],
  providers: [VisitService]
})
export class VisitsModule {
}
