import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Ordine} from '../models/Ordine';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdineRepositoryService {
  private apiUrl = '/api/ordine';
  constructor(private http:HttpClient) {}


  getOrdine(ordine:{tavoloId:number, prodotti:string[], totale:number}):Observable<string>
  {
    return this.http.post<string>(this.apiUrl,ordine);
  }
}
