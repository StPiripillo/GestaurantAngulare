import {Routes} from '@angular/router';
import {SalaComponent} from '../components/sala/sala.component';
import {TavoloComponent} from '../components/tavolo/tavolo.component';
import {OrdineComponent} from '../components/ordine/ordine.component';

export const routes: Routes = [
  {path: 'sala', component: SalaComponent},
  {path: 'tavoli', component: TavoloComponent},
  {path: 'ordine', component: OrdineComponent},

]
