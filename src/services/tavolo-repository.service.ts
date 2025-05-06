import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tavolo} from '../models/Tavolo';

@Injectable ({
  providedIn: 'root'
})
export class TavoloRepositoryService {
  private apiUrl = '/api/tavolo';
  constructor(private http: HttpClient) { }

  eliminaTavolo(numeroTavolo: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${numeroTavolo}`);
  }
  getTavoli():Observable<Tavolo>
  {
    return this.http.get<Tavolo>(this.apiUrl);
  }


}
