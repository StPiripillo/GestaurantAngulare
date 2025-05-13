import { Injectable } from '@angular/core';
import {ProdottiRepoService} from '../prodotti-repo.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGlobaleService {
  ProdottiInApp: any[] = [];

  constructor(private prodRepo:ProdottiRepoService) {
    this.ricaricaProdotti()
  }

  ricaricaProdotti()
  {
    this.prodRepo.getProdotti().subscribe(arrayProdottiLetti => this.ProdottiInApp = arrayProdottiLetti);
  }
}
