import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {Tipologia} from '../../models/Prodotti';
import {ProdottiComponent} from '../prodotti/prodotti.component';
import {ProductEventService} from "../../services/product-event.service";
import {Prodotti, ProdottiRepoService} from "../../services/prodotti-repo.service";

@Component({
  selector: 'app-nav-bar-ordine',
  imports: [
    NgForOf,
    NgIf,
    ProdottiComponent
  ],
  templateUrl: './ordine.component.html',
  styleUrl: './ordine.component.css'
})
export class OrdineComponent implements OnInit {
  spaziatoreAttivo = false;

  @ViewChild('annotazioneTextarea') annotazioneRef!: ElementRef<HTMLTextAreaElement>;

  toggleNota(): void {
    this.spaziatoreAttivo = !this.spaziatoreAttivo;
  }

  salvaAnnotazione(): void {
    const testo = this.annotazioneRef.nativeElement.value;
    alert("Annotazione salvata: " + testo);
    this.annotazioneRef.nativeElement.value = '';
    this.spaziatoreAttivo = false;
  }

  prodotto: Prodotti[] = [];
  tipologie: Tipologia[] = [];
  tipologiaSelezionata: string = '';
  piattifiltrati: { nome: string; prezzo: number }[] = [];

  constructor(private filtroService: FiltroService,private prodottoRepo:ProdottiRepoService, private productEventService: ProductEventService) {
  }

  AllProdotti(){
    this.prodottoRepo.getProdotti().subscribe((data) => {
      this.prodotto = data;
    });
  }

  ngOnInit(): void {
    this.AllProdotti();
    this.filtroService.getCategoria().subscribe((categorie: string[]) => {
      this.tipologie = categorie.map(cat => cat as Tipologia);
    });
    this.productEventService.richiediCaricamento(); // Carica i prodotti all'inizializzazione
  }

  selezionaTipologia(tip: Tipologia) {
    this.tipologiaSelezionata = tip;
    this.piattifiltrati = this.prodotto.filter(prodotto => prodotto.tipologia === tip).map(prodotto => ({nome:prodotto.nome, prezzo:prodotto.prezzo}));
    this.productEventService.richiediCaricamento(); // Ricarica i prodotti quando si seleziona una tipologia
  }
}
