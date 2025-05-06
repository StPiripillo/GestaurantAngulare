import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrdineRepositoryService {

  constructor(private http:HttpClient) { }

  getOrdine()
  {
    return this.http.get('/api/ordine');
  }
}
