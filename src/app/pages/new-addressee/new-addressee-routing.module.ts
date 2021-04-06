import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAddresseeComponent } from './new-addressee.component';

const routes: Routes = [
  { path: '', component: NewAddresseeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewAddresseeRoutingModule { }
