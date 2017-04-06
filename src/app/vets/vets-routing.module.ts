

import {Routes, RouterModule} from '@angular/router';
import {VetListComponent} from './vet-list/vet-list.component';
import {VetAddComponent} from './vet-add/vet-add.component';
import {VetEditComponent} from './vet-edit/vet-edit.component';
import {NgModule} from '@angular/core';

const vetRoutes: Routes = [
  {path: 'vets', component: VetListComponent},
  {path: 'vets/add', component: VetAddComponent},
  {path: 'vets/:id/edit', component: VetEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(vetRoutes)],
  exports: [RouterModule]
})

export class VetsRoutingModule {
}
