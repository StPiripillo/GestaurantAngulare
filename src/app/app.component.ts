import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarSalaComponent} from '../components/navbarSala/navbarSala.component';
import {TavoloComponent} from '../components/tavolo/tavolo.component';
import {SalaComponent} from '../components/sala/sala.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarSalaComponent, TavoloComponent, SalaComponent,NavbarSalaComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menuAperto: boolean = false;


  toggleMenu() {
    this.menuAperto = !this.menuAperto;
  }


  selezionaCategoria(categoria: string) {
    console.log('Categoria selezionata:', categoria);
    this.menuAperto = false;

  }
}
