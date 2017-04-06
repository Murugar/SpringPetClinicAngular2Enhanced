
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {VetListComponent} from './vet-list/vet-list.component';
import {VetService} from './vet.service';
import {VetsRoutingModule} from './vets-routing.module';
import {VetEditComponent} from './vet-edit/vet-edit.component';
import {VetAddComponent} from './vet-add/vet-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VetsRoutingModule
  ],
  declarations: [
    VetListComponent,
    VetEditComponent,
    VetAddComponent
  ],
  exports: [
    VetListComponent,
    VetEditComponent,
    VetAddComponent
  ],
  providers: [VetService]
})
export class VetsModule {
}
