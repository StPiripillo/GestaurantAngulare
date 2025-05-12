import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {Tipologia} from '../../models/Prodotti';
import {ProdottiComponent} from '../prodotti/prodotti.component';
import {Router} from '@angular/router';
import {ProductEventService} from "../../services/product-event.service";
import {Prodotti} from "../../services/prodotti-repo.service";

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


  tipologie: Tipologia[] = [];
  tipologiaSelezionata: string = '';
  piattifiltrati: string[] = [];

  constructor(private filtroService: FiltroService, router: Router, private productEventService: ProductEventService) {
  }

  ngOnInit(): void {
    this.filtroService.getCategoria().subscribe((categorie: string[]) => {
      this.tipologie = categorie.map(cat => cat as Tipologia);
    });
    this.productEventService.richiediCaricamento(); // Carica i prodotti all'inizializzazione
  }

  selezionaTipologia(tip: Tipologia) {
    this.tipologiaSelezionata = tip;
    this.piattifiltrati = tip ? [] : [];
    this.productEventService.richiediCaricamento(); // Ricarica i prodotti quando si seleziona una tipologia
  }
}
