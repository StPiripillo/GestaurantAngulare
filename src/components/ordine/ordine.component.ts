import {Component, inject, OnInit} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {Tipologia} from '../../models/Prodotti';
import {ProdottiComponent} from '../prodotti/prodotti.component';
import {Router} from '@angular/router';


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

  tipologie: Tipologia[] = [];
  tipologiaSelezionata: string = '';
  piattifiltrati: string[] = [];

  constructor(private filtroService: FiltroService, router:Router) {
  }

  ngOnInit(): void {
    this.filtroService.getCategoria().subscribe((categorie: string[]) => {
      this.tipologie = categorie.map(cat => cat as Tipologia);
    });
  }

  selezionaTipologia(tip: Tipologia) {
    this.tipologiaSelezionata = tip;
    this.piattifiltrati = tip ? [] : [];
  }
}
