import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Prodotti} from '../../models/Prodotti';
import {ProdottiRepoService} from '../../services/prodotti-repo.service';

@Component({
  selector: 'app-prodotti',
  imports: [
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit {
  prodotti: Prodotti[] = [];
  ordine: Prodotti[] = [];
  prodottiFiltrati: Prodotti[] = [];
  filtro: string [] = [];

  constructor(private prodottoRepo:ProdottiRepoService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Tipologia = params.get('tipologia');
      if (Tipologia) {
        this.filtraProdotti([Tipologia]);
        this.caricaProdotti();
      }
    })

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
    this.prodottiFiltrati=this.prodotti.filter(prodotti => prodotti.Tipologia ===tipologia);
  }



}

