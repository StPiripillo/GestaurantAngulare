import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarSalaComponent} from '../components/navbarSala/navbarSala.component';

@Component({
  selector: 'app-root',
  imports:[RouterOutlet, NavbarSalaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestaurantAngular';
}
