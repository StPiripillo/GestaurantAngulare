import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav-bar-sala',
  imports : [RouterLink],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {
  tavoliEsistenti:string[] = [];

  onNewTable() {
    const numeroTavolo = prompt("Inserisci il numero del tavolo:");
    if (numeroTavolo) {
      if (this.tavoliEsistenti.includes(numeroTavolo)) {
        alert(`Il tavolo ${numeroTavolo} esiste già!`);
      } else {
        this.tavoliEsistenti.push(numeroTavolo);
        console.log(`Nuovo tavolo creato: ${numeroTavolo}`);
      }
    }
  }


}

