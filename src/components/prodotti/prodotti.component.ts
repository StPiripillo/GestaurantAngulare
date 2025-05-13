import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProdottiRepoService, } from '../../services/prodotti-repo.service';
import {FiltroService} from '../../services/filtro-repository.service';
import {ProductEventService} from '../../services/product-event.service';
import {Subscription} from 'rxjs';
import {CurrencyPipe} from '@angular/common';
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';
import {Prodotti, Tipologia} from '../../models/Prodotti';

@Component({
  selector: 'app-prodotti',
  imports: [],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit, OnDestroy {
  prodotto: Prodotti[] = [];
  ordine: Prodotti[] = [];
  prodottiFiltrati: Prodotti[] = [];
  filtro: string[] = [];
  private productEventSubscription?: Subscription;

  modificaPrezzo(id:number): void {
    const nuovoPrezzo =parseFloat(prompt("Inserisci il nuovo prezzo:") || "0");

    this.prodottoRepo.modificaPrezzo(id, nuovoPrezzo).subscribe(() => {
      this.caricaProdotti();
    });
  }
  eliminaProdotto(id: number): void {
    this.prodottoRepo.eliminaProdotto(id).subscribe(() => {
      this.filtraProdotti(this.filtro);
    });
  }

  constructor(private prodottoRepo: ProdottiRepoService, public prodS: ProdGlobaleService, private productEventService: ProductEventService) {
  }

  ngOnInit(): void {
    this.caricaProdotti();
    this.productEventSubscription = this.productEventService.caricaProdotti$.subscribe(() => {
      this.caricaProdotti();
    });
  }

  ngOnDestroy(): void {
    if (this.productEventSubscription) {
      this.productEventSubscription.unsubscribe();
    }
  }

  caricaProdotti(): void {
    this.prodottoRepo.getProdotti().subscribe(data => {
      this.prodotto = data;
    });
  }

  filtraProdotti(tipologia: string[]): void {
    this.filtro = tipologia;
    this.prodottiFiltrati = tipologia.length > 0
      ? this.prodotto.filter(prodotto => prodotto.Tip.includes(tipologia[0] as Tipologia))
      : this.prodotto;
  }

  protected readonly ProdottiRepoService = ProdottiRepoService;
}

