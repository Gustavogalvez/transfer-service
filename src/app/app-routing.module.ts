import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './shared/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: 'new-addressee',
        loadChildren: () => import('./pages/new-addressee/new-addressee.module').then(m => m.NewAddresseeModule)
      },
      {
        path: 'transfer',
        loadChildren: () => import('./pages/transfer/transfer.module').then(m => m.TransferModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
