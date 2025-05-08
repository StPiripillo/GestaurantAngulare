import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProdottiComponent} from '../components/prodotti/prodotti.component';

const routes: Routes = [
  { path: 'prodotti/:categoria', component: ProdottiComponent },
  { path: '**', redirectTo: 'prodotti/tutte' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
