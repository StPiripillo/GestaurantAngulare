import {Component} from '@angular/core';
import {Dimensione, Forma, Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgForOf, NgIf} from '@angular/common';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';
import {ProdottiRepoService} from '../../services/prodotti-repo.service';
import {Intolleranze, Prodotti, Tipologia} from '../../models/Prodotti';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar-sala',
  imports: [NgForOf, FormsModule, NgIf],
  templateUrl: './navbarSala.component.html',
  styleUrl: './navbarSala.component.css'
})
export class NavbarSalaComponent {

  tavoliBackup: Tavolo[] = [];
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
      posti: 2
    }
  tavoloDaSalvare: Tavolo =
    {
      numeroTavolo: 0,
      forma: Forma.QUADRATO,
      dimensione: Dimensione.PICCOLO,
      posti: 0,
      occupato: 0,
      x:0,
      y:0
    };

  constructor(private TavoloRepoS: TavoloRepositoryService, private snackBar:MatSnackBar,public tavoloS:TavoloGlobaleService, private ProdS:ProdottiRepoService) {
    this.controllaOra()
  }

  controllaOra() {
    const oraAttuale = new Date().getHours();
    const oraLimite = 20;
    this.utilizzabile = oraAttuale < oraLimite;
  }

  caricaTavoli() {
    this.TavoloRepoS.getTavoli().subscribe((data) => {
      this.tavoloS.TavoliInApp = data;
    });
  }

  creaTavolo()
  {
    if (!this.utilizzabile) {

      alert("Non puoi creare nuovi tavoli dopo le 20:00");
      return; }

    const tavoloEsistente = this.tavoloS.TavoliInApp.some(
      (tavolo) => tavolo.numeroTavolo === this.nuovoTavolo.numeroTavolo
    );

    if (tavoloEsistente) {
      alert("Esiste già un tavolo con questo numero!");
      return;
    }
    this.tavoloDaSalvare.numeroTavolo = this.nuovoTavolo.numeroTavolo;
    this.tavoloDaSalvare.forma = this.nuovoTavolo.forma;
    this.tavoloDaSalvare.dimensione = this.nuovoTavolo.dimensione;
    this.tavoloDaSalvare.posti = this.nuovoTavolo.dimensione == Dimensione.PICCOLO ? 2 : this.nuovoTavolo.dimensione == Dimensione.MEDIO ? 4 : 8;
    this.TavoloRepoS.insertTavolo(this.tavoloDaSalvare).subscribe(() => {
      this.caricaTavoli();
      window.location.reload();

    }, error => {
      console.log("Errore durante il salvataggio:", error);
    })
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
        this.showPopup('Prodotto creato con successo!');

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

  // Funzioni backup

  popupMessage: string='';
  popupVisible: boolean=false;
  salvaBackupPosizioni(): void {
    const posizioni = this.tavoloS.TavoliInApp
      .filter(t => t.id !== undefined)
      .map(t => ({
        id: t.id as number,
        x: t.x,
        y: t.y
      }));
    console.log("Posizioni:", posizioni);
    this.TavoloRepoS.salvaBackupPosizioni(posizioni).subscribe({
      next: () => {
        this.showPopup('Backup posizioni salvato!');
      },
      error: (err) => {
        this.showPopup('Errore nel salvataggio del backup!');
        console.error(err);
      }
    });
  }

  showPopup(message: string): void {
    this.popupMessage = message;
    this.popupVisible = true;

    setTimeout(() => {
      this.popupVisible = false; // Nasconde il popup dopo 3 secondi
    }, 2000);
  }

  caricaBackupPosizioni(): void {
    this.TavoloRepoS.caricaBackupPosizioni().subscribe((backup) => {
      backup.forEach((b: { id: number; x: number; y: number; }) => {
        const tavolo = this.tavoloS.TavoliInApp.find(t => t.id === b.id);
        if (tavolo) {
          tavolo.x = b.x;
          tavolo.y = b.y;
        }
      });
      this.showPopup('Backup posizioni caricato!')

    }, error => {
      this.showPopup('Errore nel caricamento del backup!');

      console.error(error);
    });
  }

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

