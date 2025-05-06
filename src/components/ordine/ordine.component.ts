import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {OrdineRepositoryService} from '../../services/ordine-repository.service';

@Component({
  selector: 'app-ordine',
  imports:[NgFor],
  templateUrl: './ordine.component.html',
  styleUrl: './ordine.component.css'
})
export class OrdineComponent {

  ordine:any=[];

  constructor(private ordineRepo:OrdineRepositoryService) {
    this.ordineRepo.getOrdine().subscribe((data)=> {this.ordine=data})
  }

}
