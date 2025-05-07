import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tavolo} from '../models/Tavolo';

@Injectable ({
  providedIn: 'root'
})
export class TavoloRepositoryService {
  private apiUrl = '/api/tavoli';
  constructor(private http: HttpClient) { }

  insertTavolo( tavolo:Tavolo): Observable<Tavolo> {
    return this.http.post<Tavolo>(this.apiUrl, tavolo);
  }

  eliminaTavolo(id: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getTavoli(): Observable<Tavolo[]>
  {
    return this.http.get<Tavolo[]>(this.apiUrl);
  }

  updatePosition(id: number | undefined, x: number, y: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { x, y });
  }
}
