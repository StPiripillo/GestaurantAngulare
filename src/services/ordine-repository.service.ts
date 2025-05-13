import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ordine} from '../models/Ordine';
import {Observable} from 'rxjs';
import {Prodotti} from '../models/Prodotti';
import {Tavolo} from '../models/Tavolo';

@Injectable({
  providedIn: 'root'
})
export class OrdineRepositoryService {
  private apiUrl = '/api/ordine';
  constructor(private http:HttpClient) {}


  getOrdini():Observable<Ordine[]>
  {
  return this.http.get<Ordine[]>(`${this.apiUrl}`);
  }

  nuovoOrdine(ordine:Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(`${this.apiUrl}/newordine`, ordine);
  }

}
