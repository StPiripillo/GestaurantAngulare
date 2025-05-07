import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-nav-bar-sala',
  imports: [RouterLink, NgForOf],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {


  tavoli: Tavolo[] = [];

  constructor (private reposi:TavoloRepositoryService,private stato:TavoloGlobaleService, private router:Router) {}
  tavoloDaSalvare:Tavolo =
  {
    id: 0,
    numeroTavolo: 0,
    posti: 0,
    stato: true
  };

  salvaTavolo(){
   const numeroIns = prompt("Inserisci il numero del tavolo da aggiungere");
   if (numeroIns)
   {const numeroTav = parseInt(numeroIns)
   const numeroEsistente = this.tavoli.some(tavolo => tavolo.numeroTavolo === numeroTav);


    if (numeroEsistente)
    {
      alert("Tavolo già esistente");
    }
    else {
      this.tavoloDaSalvare.numeroTavolo = numeroTav;
      console.log("Dati Inviati: ", this.tavoloDaSalvare);
      this.reposi.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
        alert("Tavolo aggiunto");
        this.stato.ricaricaTavoli();
      }, error => {
        console.log("Errore durante il salvataggio:", error);
      })
    }
   }

  }

  ngOnInit() {
    this.reposi.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

}

