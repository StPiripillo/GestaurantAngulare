import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Prodotti} from '../models/Prodotti';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiUrl = '/api/ordine/categoria';
  private _categoriaSubject = new BehaviorSubject<string>('tutti');

  constructor(private http:HttpClient) { }

  setCategoria(categoria: string): void {
    this._categoriaSubject.next(categoria);
  }

  getCategoria(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
