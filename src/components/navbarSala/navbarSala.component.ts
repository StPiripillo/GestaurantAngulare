import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-nav-bar-sala',
  imports: [RouterLink, NgForOf],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent implements OnInit {


  tavoli: Tavolo[] = [];

  constructor(private reposi: TavoloRepositoryService, private router: Router) {
  }

  tavoloDaSalvare: Tavolo =
    {
      id: 0,
      //numeroTAvolo: 0,
      posti: 0,
      occupato: true,
      x:0,
      y:0
    };

  caricaTavoli() {
    this.reposi.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

  salvaTavolo() {


    const postiIns = prompt("Inserisci il numero di posti del tavolo da aggiungere");
    if(postiIns) {
      const postiTav = parseInt(postiIns);
      this.tavoloDaSalvare.posti = postiTav;
    }



    console.log("Dati Inviati: ", this.tavoloDaSalvare);
    this.reposi.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
      alert("Tavolo aggiunto");
      this.caricaTavoli();
      window.location.reload();

    }, error => {
      console.log("Errore durante il salvataggio:", error);
    })
  }



  ngOnInit() {
    this.reposi.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }
}

