import {Component, OnInit} from '@angular/core';
import {ProdottiRepositoryService, Prodotto} from '../../services/prodotti-repository.service';

@Component({
  selector: 'app-prodotti',
  imports : [],
  templateUrl: './prodotti.component.html',
  styleUrl: './prodotti.component.css'
})
export class ProdottiComponent implements OnInit {
  prodotti: Prodotto[] = [];
  ordine: Prodotto[] = [];

  constructor(private prodottoRepo: ProdottiRepositoryService) {
  }

  ngOnInit(): void {
    this.caricaProdotti();
  }

  caricaProdotti(): void {
    this.prodottoRepo.getProdotti().subscribe(data => {
      this.prodotti = data;
    });
  }
}

