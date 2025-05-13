import {Component} from '@angular/core';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgForOf, NgIf} from '@angular/common';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';
import {ProdottiRepoService} from '../../services/prodotti-repo.service';
import {Prodotti, Tipologia} from '../../models/Prodotti';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-navbar-sala',
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {

  tavoli: Tavolo[] = [];
  utilizzabile=true;
  mostraDialog: boolean = false;
  prodotto : Prodotti[] = [];
  nuovoProdotto: { nome: string; prezzo: number; Tip: Tipologia }=
    {

      nome: '',
      prezzo: 0,
      Tip: Tipologia.ANTIPASTI

    };
  prodottoDaSalvare: Prodotti =
    {
      id: 0,
      nome: '',
      prezzo: 0,
      Tip: Tipologia.ANTIPASTI,
      intolleranze: [],
      qtn: 0,
      descrizione: ''
    };


  constructor(private reposi: TavoloRepositoryService, private prodRepo:ProdGlobaleService,public tavoloS:TavoloGlobaleService, private ProdS:ProdottiRepoService) {
    this.controllaOra()
  }

  tavoloDaSalvare: Tavolo =
    {
      id: 0,
      numeroTavolo: 0,
      // Forma: [],
      // Dimensione: [],
      posti: 0,
      occupato: 0,
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
          this.caricaTavoli();
          alert("Tavolo aggiunto");
          window.location.reload();

        }, error => {
          console.log("Errore durante il salvataggio:", error);
        })
      }
    }
  }

  caricaProdotti() {
    this.ProdS.getProdotti().subscribe((data) => {
      this.prodotto= data;
    });
  }

  creaProdotto() {
    if (this.nuovoProdotto.nome && this.nuovoProdotto.prezzo > 0 && this.nuovoProdotto.Tip) {
      this.prodottoDaSalvare.id = Date.now();
      this.prodottoDaSalvare.nome = this.nuovoProdotto.nome;
      this.prodottoDaSalvare.prezzo = this.nuovoProdotto.prezzo;
      this.prodottoDaSalvare.Tip = this.nuovoProdotto.Tip;
      this.chiudiProdDialog()
      this.ProdS.nuovoProdotto(this.prodottoDaSalvare).subscribe(() => {
        this.caricaProdotti();
        alert("Prodotto aggiunto");

        window.location.reload();

      }, error => {
        console.log("Errore durante il salvataggio:", error);
      })
    }

  }
  nuovoProdottoDialog(): void {
    this.nuovoProdotto = {nome: '', prezzo: 0, Tip:Tipologia.ANTIPASTI};  // Reset dei dati
    this.mostraDialog = true;
  }

  // Chiude il dialog
  chiudiProdDialog(): void {
    this.mostraDialog = false;
  }

  protected readonly Object = Object;
  protected readonly Tip = Tipologia;
}

