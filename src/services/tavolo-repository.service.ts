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

  eliminaTavolo(id: number | undefined):Observable<Tavolo>{
    return this.http.delete<Tavolo>(`${this.apiUrl}/${id}`);
  }
  getTavoli(): Observable<Tavolo[]>
  {
    return this.http.get<Tavolo[]>(this.apiUrl);
  }

  updatePosition(id: number | undefined, x: number, y: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { x, y });
  }
  updateNomeTavolo(id: number | undefined, numeroTavolo: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/numero`, { numeroTavolo });
  }
  updateOccupato(id: number | undefined, occupato: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/occupato`, { occupato });
  }

  salvaBackupPosizioni(posizioni: { id: number; x: number; y: number }[]): Observable<any> {
    return this.http.post('/api/tavoli/backup-posizioni', posizioni);
  }

  caricaBackupPosizioni(): Observable<{ id: number; x: number; y: number }[]> {
    return this.http.get<{ id: number; x: number; y: number }[]>('/api/tavoli/backup-posizioni');
  }
}
