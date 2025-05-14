import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ordine} from '../models/Ordine';
import {Observable} from 'rxjs';
import {Prodotti} from '../models/Prodotti';

@Injectable({
  providedIn: 'root'
})
export class OrdineRepositoryService {
  private apiUrl = '/api/ordine';
  constructor(private http:HttpClient) {}


  nuovoOrdine(ordine: {
    tavoloId: number;
    prodotti: string[];
    totale: number;
    nomeOrdine: string;
    noteOrdine: string
  }):Observable<Ordine>
  {
    return this.http.post<Ordine>(`${this.apiUrl}/newordine`, ordine);
  }
  getOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(`${this.apiUrl}`);
  }

  getOrdineById(id: number): Observable<Ordine> {
    return this.http.get<Ordine>(`${this.apiUrl}/${id}`);
  }
  //per filtro
  getOrdiniByTavolo(tavoloId: number): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(`${this.apiUrl}/bytavolo`);
  }
}
