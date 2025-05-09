import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgForOf} from '@angular/common';
import {ProdottiComponent} from '../prodotti/prodotti.component';

@Component({
  selector: 'app-nav-bar-sala',
  imports: [RouterLink, NgForOf, ProdottiComponent],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {

  dragAttivo: boolean = false;

  tavoli: Tavolo[] = [];
  utilizzabile=true;

  constructor(private reposi: TavoloRepositoryService, private router: Router) {
    this.controllaOra()
  }

  tavoloDaSalvare: Tavolo =
    {
      id: 0,
      numeroTavolo: 0,
      posti: 0,
      occupato: false,
      x:0,
      y:0
    };

  controllaOra() {
    const oraAttuale = new Date().getHours();
    const oraLimite = 20;
    this.utilizzabile = oraAttuale < oraLimite;
  }

  caricaTavoli() {
    this.reposi.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

  salvaTavolo() {
     if (!this.utilizzabile) {
      alert("Non puoi creare nuovi tavoli dopo le 20:00");
      return;
    }
    const numeroIns = prompt("Inserisci il numero del tavolo da aggiungere");

    if (numeroIns) {
      const numeroTav = parseInt(numeroIns)
      const numeroEsistente = this.tavoli.some(tavolo => tavolo.numeroTavolo === numeroTav);

      const postiIns = prompt("Inserisci il numero di posti del tavolo da aggiungere");
      if (postiIns) {
        const postiTav = parseInt(postiIns);
        this.tavoloDaSalvare.posti = postiTav;
      }
      if (numeroEsistente) {
        alert("Tavolo già esistente");
      } else {
        this.tavoloDaSalvare.numeroTavolo = numeroTav;
        console.log("Dati Inviati: ", this.tavoloDaSalvare);


        console.log("Dati Inviati: ", this.tavoloDaSalvare);
        this.reposi.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
          alert("Tavolo aggiunto");
          this.caricaTavoli();
          window.location.reload();

        }, error => {
          console.log("Errore durante il salvataggio:", error);
        })
      }
    }
  }
}

