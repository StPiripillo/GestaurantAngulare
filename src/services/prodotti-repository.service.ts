import {Inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Prodotti} from '../models/Prodotti';
import {Ingredienti} from '../models/Ingredienti';
import {Observable} from 'rxjs';

export interface Prodotto{
  id: number,
  nome: string,
  prezzo: number,
  tipologia: string[],
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
    return this.http.get<Prodotti[]>('/api/ordine');
  }

}
