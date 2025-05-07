import {Component, OnInit} from '@angular/core';
import {FiltroService} from '../../services/filtro-repository.service';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-nav-bar-ordine',
  imports: [],
  templateUrl: './navbarOrdine.component.html',
  styleUrl: './navbarOrdine.component.css'
})
export class NavbarOrdineComponent{

  constructor(private filtroService: FiltroService) {}

  selezionaCategoria(categoria: string): void {
    this.filtroService.setCategoria(categoria);
  }




}
