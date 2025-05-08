import {Component, OnInit} from '@angular/core';
import {ProdottiRepositoryService, Prodotti} from '../../services/prodotti-repository.service';
import {FiltroService} from '../../services/filtro-repository.service';

@Component({
  selector: 'app-prodotti',
  imports : [],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit {
  prodotti: Prodotti[] = [];
  ordine: Prodotti[] = [];
  prodottiFiltrati: Prodotti[] = [];
  filtro: string [] = [];

  constructor(private prodottoRepo: ProdottiRepositoryService, private filtroService: FiltroService) {
  }

  ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottoRepo.getProdotti().subscribe((data => {
      this.prodotti = data;
      this.prodottiFiltrati = data;
    }));
  }

  modificaPrezzo(prodotto: Prodotti, nuovoPrezzo: number): void {
    const prodottoModificato = {prodotto, prezzo: nuovoPrezzo};
    this.prodottoRepo.modificaPrezzo(prodottoModificato).subscribe(() => {
      this.caricaProdotti();
    });
  }

  filtraProdotti(tipologia:string[]): void {
    this.filtro = tipologia;
    this.prodottiFiltrati=this.prodotti.filter(prodotti => prodotti.tipologia===tipologia);
  }


}

