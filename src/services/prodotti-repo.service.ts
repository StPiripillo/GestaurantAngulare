import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Prodotti {
  id: number;
  nome: string;
  prezzo: number;
  tipologia: string;
}

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

  eliminaProdotto(id: number | undefined): Observable<Prodotti> {
    return this.http.delete<Prodotti>('/api/ordine/{id}');
  }
}
