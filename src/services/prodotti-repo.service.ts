import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Prodotti} from '../models/Prodotti';

@Injectable({
  providedIn: 'root'
})
export class ProdottiRepoService {
  private apiUrl = '/api/ordine';
  constructor(private http:HttpClient) { }

  getProdotti():Observable<Prodotti[]> {
    return this.http.get<Prodotti[]>(`${this.apiUrl}/prodotti`);
  }

  modificaPrezzo(id: number | undefined, prezzo:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/prezzo`, { prezzo });
  }

  eliminaProdotto(id: number): Observable<Prodotti> {
    return this.http.delete<Prodotti>(`${this.apiUrl}/${id}`);
  }

  nuovoProdotto(prodotto: Prodotti): Observable<Prodotti> {
    return this.http.post<Prodotti>(`${this.apiUrl}/newprodotto`, prodotto);
  }
}
