import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiUrl = '/api/ordine/categoria';
  constructor(private http:HttpClient) { }

  getCategoria(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
