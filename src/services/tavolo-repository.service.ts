import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable ({
  providedIn: 'root'
})
export class TavoloRepositoryService {
  private apiUrl = '/api/tavolo';
  constructor(private http: HttpClient) { }

  eliminaTavolo(numeroTavolo: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${numeroTavolo}`);
  }


}
