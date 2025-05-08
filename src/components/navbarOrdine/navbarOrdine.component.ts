import {Component, inject, OnInit} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {Tipologia} from '../../models/Prodotti';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {OverlayComponent} from '../overlay/overlay.component';


@Component({
  selector: 'app-nav-bar-ordine',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './navbarOrdine.component.html',
  styleUrl: './navbarOrdine.component.css'
})
export class NavbarOrdineComponent implements OnInit {

  tipologie: Tipologia[] = [];
  tipologiaSelezionata: string = '';
  piattifiltrati: string[] = [];

  constructor(private filtroService: FiltroService) {
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
