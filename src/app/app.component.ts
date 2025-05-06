import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarSalaComponent} from '../components/navbarSala/navbarSala.component';
import {TavoloComponent} from '../components/tavolo/tavolo.component';

@Component({
  selector: 'app-root',
  imports:[RouterOutlet, NavbarSalaComponent, TavoloComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestaurantAngular';
}
