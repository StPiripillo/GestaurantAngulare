import {Routes} from '@angular/router';
import {OrdineComponent} from '../components/ordine/ordine.component';
import {SalaComponent} from '../components/sala/sala.component';

export const routes: Routes = [
  {path : 'ordine', component: OrdineComponent},
  {path: 'sala', component: SalaComponent}

]
