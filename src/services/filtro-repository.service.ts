import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private tipoSelezionata = new BehaviorSubject<string>('tutti');
  categoria$ = this.tipoSelezionata.asObservable();

  setCategoria(tipologia: string): void {
    this.tipoSelezionata.next(tipologia);
  }
}
