import {Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ingredienti} from '../models/Ingredienti';
import {Observable} from 'rxjs';
import {Tipologia} from '../models/Prodotti';

export interface Prodotti{
  id: number,
  nome: string,
  prezzo: number,
  tipologia: Tipologia[],
  intolleranza: string[],
  ingredienti: Ingredienti[],
  qtn: number
}

@Inject ({
  providedIn: 'root'
})

export class ProdottiRepositoryService
{
  constructor(private http:HttpClient) { }

  getProdotti():Observable<Prodotti[]> {
    return this.http.get<Prodotti[]>('/api/ordine/prodotti');
  }

  modificaPrezzo(prodottoModificato: { prodotto: Prodotti; prezzo: number }) {
    return this.http.post<Prodotti[]>('/api/prodotti', prodottoModificato);

  }
}
