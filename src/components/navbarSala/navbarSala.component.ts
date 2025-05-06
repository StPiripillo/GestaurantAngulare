import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Tavolo} from '../../models/Tavolo';

@Component({
  selector: 'app-nav-bar-sala',
  imports : [RouterLink],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {

tavoli:Tavolo[] = []
  onNewTable() {
  const numeroTavolo = prompt("Inserisci il numero del tavolo:");
  if(numeroTavolo)
  {
    const nuovoTavolo :Tavolo = {
    id: this.tavoli.length + 1,
    numeroTavolo: parseInt(prompt("Inserisci il numero del tavolo") || "0"),
    posti: parseInt(prompt("Inserisci il numero di posti") || "0"),
    stato: false}

    this.tavoli.push(nuovoTavolo);
    prompt('Nuovo tavolo creato con successo');
  }


  }


}

