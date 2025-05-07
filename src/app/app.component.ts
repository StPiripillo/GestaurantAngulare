import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarSalaComponent} from '../components/navbarSala/navbarSala.component';
import {TavoloComponent} from '../components/tavolo/tavolo.component';
import {SalaComponent} from '../components/sala/sala.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarSalaComponent, TavoloComponent, SalaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestaurantAngular';
}
