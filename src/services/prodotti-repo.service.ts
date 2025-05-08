import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prodotti} from '../models/Prodotti';

@Injectable({
  providedIn: 'root'
})
export class ProdottiRepoService {

  constructor(private http:HttpClient) { }

  getProdotti():Observable<Prodotti[]> {
    return this.http.get<Prodotti[]>('/api/ordine/prodotti');
  }

  modificaPrezzo(prodottoModificato: { prodotto: Prodotti; prezzo: number }) {
    return this.http.post<Prodotti[]>('/api/prodotti', prodottoModificato);

  }

}
