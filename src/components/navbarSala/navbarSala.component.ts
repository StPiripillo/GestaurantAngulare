import {Component} from '@angular/core';
import {Dimensione, Forma, Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgForOf, NgIf} from '@angular/common';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';
import {ProdottiRepoService} from '../../services/prodotti-repo.service';
import {Intolleranze, Prodotti, Tipologia} from '../../models/Prodotti';
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

  nuovoProdotto: { nome: string; prezzo: number; Tip: Tipologia; intolleranze:Intolleranze }=
    {
      nome: '',
      prezzo: 0,
      Tip: Tipologia.ANTIPASTI,
      intolleranze: Intolleranze.GLUTINE,
    };
  prodottoDaSalvare: Prodotti =
    {
      id: 0,
      nome: '',
      prezzo: 0,
      tipologia: Tipologia.ANTIPASTI,
      intolleranze: Intolleranze.GLUTINE,
      qtn: 0,
      descrizione: ''
    };


  nuovoTavolo: { numeroTavolo: number; forma: Forma; dimensione: Dimensione; posti: number} =
    {
      numeroTavolo: 0,
      forma: Forma.QUADRATO,
      dimensione: Dimensione.PICCOLO,
      posti: 4
    }
  tavoloDaSalvare: Tavolo =
    {
      id: 0,
      numeroTavolo: 0,
      forma: Forma.QUADRATO,
      dimensione: Dimensione.PICCOLO,
      posti: 0,
      occupato: 0,
      x:0,
      y:0
    };

  constructor(private TavoloRepoS: TavoloRepositoryService, private prodRepo:ProdGlobaleService,public tavoloS:TavoloGlobaleService, private ProdS:ProdottiRepoService) {
    this.controllaOra()
  }

  controllaOra() {
    const oraAttuale = new Date().getHours();
    const oraLimite = 20;
    this.utilizzabile = oraAttuale < oraLimite;
  }

  caricaTavoli() {
    this.TavoloRepoS.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

  creaTavolo()
  {
    if (!this.utilizzabile) {
      alert("Non puoi creare nuovi tavoli dopo le 20:00");
      return; }
    this.tavoloDaSalvare.id = Date.now();
    this.tavoloDaSalvare.numeroTavolo = this.nuovoTavolo.numeroTavolo;
    this.tavoloDaSalvare.forma = this.nuovoTavolo.forma;
    this.tavoloDaSalvare.dimensione = this.nuovoTavolo.dimensione;
    this.tavoloDaSalvare.posti = this.nuovoTavolo.posti;
    this.TavoloRepoS.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
      this.caricaTavoli();
      alert("Tavolo aggiunto");

      window.location.reload();

    }, error => {
      console.log("Errore durante il salvataggio:", error);
    })
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
        this.TavoloRepoS.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
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
    if (this.nuovoProdotto.nome && this.nuovoProdotto.intolleranze && this.nuovoProdotto.prezzo > 0 && this.nuovoProdotto.Tip) {
      this.prodottoDaSalvare.id = Date.now();
      this.prodottoDaSalvare.nome = this.nuovoProdotto.nome;
      this.prodottoDaSalvare.prezzo = this.nuovoProdotto.prezzo;
      this.prodottoDaSalvare.tipologia = this.nuovoProdotto.Tip;
      this.prodottoDaSalvare.intolleranze = this.nuovoProdotto.intolleranze;
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
    this.nuovoProdotto = {nome: '', prezzo: 0, Tip:Tipologia.ANTIPASTI, intolleranze:Intolleranze.GLUTINE};  // Reset dei dati
    this.mostraDialog = true;
  }

  // Chiude il dialog
  chiudiProdDialog(): void {
    this.mostraDialog = false;
  }

  protected readonly Object = Object;
  protected readonly Tip = Tipologia;
  protected readonly Intolleranze = Intolleranze;


  // Funzioni per la sidebar

  isOpen = false;

  openSidebar() {
    this.isOpen = true;
  }
  closeSidebar() {
    this.isOpen = false;
  }

  protected readonly Forma = Forma;
  protected readonly Dimensione = Dimensione;
}

