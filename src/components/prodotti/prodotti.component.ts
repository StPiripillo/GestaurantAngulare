import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProdottiRepoService, Prodotti} from '../../services/prodotti-repo.service';
import {FiltroService} from '../../services/filtro-repository.service';
import {ProductEventService} from '../../services/product-event.service';
import {Subscription} from 'rxjs';
import {CurrencyPipe} from '@angular/common';
import {ProdGlobaleService} from '../../services/stato/prod-globale.service';

@Component({
  selector: 'app-prodotti',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit, OnDestroy {
  prodotto: Prodotti[] = [];
  ordine: Prodotti[] = [];
  prodottiFiltrati: Prodotti[] = [];
  filtro: string[] = [];
  private productEventSubscription?: Subscription;

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

  modificaPrezzo(prodotto: Prodotti, nuovoPrezzo: number): void {
    const prodottoModificato = {prodotto, prezzo: nuovoPrezzo};
    this.prodottoRepo.modificaPrezzo(prodottoModificato).subscribe(() => {
      this.caricaProdotti();
    });
  }

  filtraProdotti(tipologia: string[]): void {
    this.filtro = tipologia;
    this.prodottiFiltrati = tipologia.length > 0
      ? this.prodotto.filter(prodotto => prodotto.tipologia === tipologia[0])
      : this.prodotto;
  }

  eliminaProdotto(id: number): void {
    this.prodottoRepo.eliminaProdotto(id).subscribe(() => {
      this.caricaProdotti();
    });
  }

  protected readonly ProdottiRepoService = ProdottiRepoService;
}

