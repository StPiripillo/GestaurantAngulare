import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Tipologia} from '../../models/Prodotti';
import {ProdottiComponent} from '../prodotti/prodotti.component';
import {ProductEventService} from "../../services/product-event.service";
import {Prodotti, ProdottiRepoService} from "../../services/prodotti-repo.service";
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';

@Component({
  selector: 'app-nav-bar-ordine',
  imports: [
    NgForOf,
    NgIf,
    ProdottiComponent,
    CurrencyPipe
  ],
  templateUrl: './ordine.component.html',
  styleUrl: './ordine.component.css'
})
export class OrdineComponent implements OnInit,AfterViewInit {
  spaziatoreAttivo = false;

  @ViewChild('annotazioneTextarea') annotazioneRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('prodottiComponent') prodottiComponent!: ProdottiComponent;

  ngAfterViewInit(): void {
    // Ora this.prodottiComponent è inizializzato e puoi usarlo
  }

  modificaPrezzo(id:number){
    const prodotto = this.prodottiComponent.prodotto.find(p => p.id === id);
    if (prodotto)
    {
      this.prodottiComponent.modificaPrezzo(prodotto);
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

  salvaAnnotazione(): void {
    const testo = this.annotazioneRef.nativeElement.value;
    alert("Annotazione salvata: " + testo);
    this.annotazioneRef.nativeElement.value = '';
    this.spaziatoreAttivo = false;
  }

  prodotto: Prodotti[] = [];
  tipologie: Tipologia[] = [];
  tipologiaSelezionata: string = '';
  piattifiltrati: Prodotti[] = [];

  constructor(private filtroService: FiltroService,private prodottoRepo:ProdottiRepoService,
              private productEventService: ProductEventService, public prodS: ProdGlobaleService) {
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
    this.piattifiltrati = this.prodotto.filter(prodotto => prodotto.tipologia === tip);
    this.productEventService.richiediCaricamento(); // Ricarica i prodotti quando si seleziona una tipologia
  }
}
