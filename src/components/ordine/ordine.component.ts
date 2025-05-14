import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Prodotti, Tipologia} from '../../models/Prodotti';
import {ProdottiComponent} from '../prodotti/prodotti.component';
import {ProductEventService} from "../../services/product-event.service";
import {ProdottiRepoService} from "../../services/prodotti-repo.service";
import {OrdineRepositoryService} from '../../services/ordine-repository.service';
import {Ordine} from '../../models/Ordine';
import {FormsModule} from '@angular/forms';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {Tavolo} from '../../models/Tavolo';
import {TavoloComponent} from '../tavolo/tavolo.component';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';

@Component({
  selector: 'app-nav-bar-ordine',
  imports: [
    NgForOf,
    NgIf,
    ProdottiComponent,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './ordine.component.html',
  styleUrl: './ordine.component.css'
})
export class OrdineComponent implements OnInit,AfterViewInit {
  spaziatoreAttivo = false;

  carrello: { prodotto: Prodotti, nota?: string }[] = [];


  @ViewChild('annotazioneTextarea') annotazioneRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('prodottiComponent') prodottiComponent!: ProdottiComponent;

  ngAfterViewInit(): void {
    // Ora this.prodottiComponent è inizializzato e puoi usarlo
  }

  modificaPrezzo(id:number){
    const prodotto = this.prodottiComponent.prodotto.find(p => p.id === id);
    if (prodotto)
    {
      this.prodottiComponent.modificaPrezzo(id);
    }

  }
  eliminaProdotto(id: number): void {
    if (this.prodottiComponent) {
      this.prodottiComponent.eliminaProdotto(id);
    }
  }


  toggleNota(): void {
    this.spaziatoreAttivo = !this.spaziatoreAttivo;
  }



  prodotto: Prodotti[] = [];
  tipologie: Tipologia[]= [];
  tipologiaSelezionata: string = '';
  piattifiltrati: Prodotti[] = [];
  annotazione: String[] = [];
  tavolo: Tavolo [] = [];

  constructor(private filtroService: FiltroService,
              private prodottoRepo:ProdottiRepoService,
              private productEventService: ProductEventService,
              private ordRep:OrdineRepositoryService,
              private prodS:ProdottiRepoService,
              private tavoloS: TavoloRepositoryService,
              private tavoloG: TavoloGlobaleService) {
  }

  AllProdotti(){
    this.prodottoRepo.getProdotti().subscribe((data) => {
      this.prodotto = data;
    });
  }

  ngOnInit(): void {
    this.AllProdotti(); // Carica i prodotti iniziali

    this.filtroService.getCategoria().subscribe((categorie: string[]) => {
      this.tipologie = categorie.map(cat => cat as Tipologia);
    });

    // Ascolta l'evento di ricaricamento e aggiorna la lista dei prodotti
    this.productEventService.caricaProdotti$.subscribe(() => {
      this.AllProdotti();
    });
  }

  selezionaTipologia(tip: Tipologia) {
    this.tipologiaSelezionata = tip;
    this.piattifiltrati = this.prodotto.filter(prodotto => prodotto.tipologia === tip);
    this.productEventService.richiediCaricamento();
  }

  //css carrello

  isOpen = false;

  openCart() {
    this.isOpen = true;
  }

  closeCart() {
    this.isOpen = false;
  }

  aggiungiAlCarrello(prodotto: Prodotti) {
    const nota = prompt('Aggiungi una nota per questo prodotto (opzionale):') ?? undefined;
    this.carrello.push({ nota, prodotto });
  }


  salvaAnnotazione(): void {
    const testo = this.annotazioneRef.nativeElement.value.trim();
    if (testo) {
      this.annotazione.push(testo);
      alert("Annotazione salvata: " + testo);
    }
    this.annotazioneRef.nativeElement.value = '';
    this.spaziatoreAttivo = false;
  }
  rimuoviAnnotazione(index: number): void {
    this.annotazione.splice(index, 1);
  }

  ordini: Ordine[] = [];
  ordineDaSalvare = {
    tavoloId: 0,
    prodotti: [] as string[],
    totale: 0,
    nomeOrdine: '',
    noteOrdine: '',
  }
  ordineNuovo: { nomeOrdine: string, noteOrdine: string } = {
    nomeOrdine: '',
    noteOrdine: ''
  }

  caricaOrdini() {

    this.ordRep.getOrdini().subscribe((data) => {
      this.ordini = data;
    });
  }
  creaOrdine() {
    this.ordineDaSalvare = {
      tavoloId: this.tavoloG.idTavoloSelezionato, // ID del tavolo
      prodotti: this.carrello.map(item => item.prodotto.nome), // Lista dei nomi dei prodotti
      totale: this.carrello.reduce((acc, item) => acc + item.prodotto.prezzo, 0), // Calcolo del totale
      nomeOrdine: this.ordineNuovo.nomeOrdine, // Nome ordine
      noteOrdine: this.ordineNuovo.noteOrdine  // Note ordine
    };
    this.ordRep.nuovoOrdine(this.ordineDaSalvare).subscribe(() => {
      this.caricaOrdini();
      alert("Ordine creato");
      //window.location.reload();
    });
  }







}
