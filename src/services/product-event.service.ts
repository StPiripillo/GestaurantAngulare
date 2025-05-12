import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {Prodotti} from '../models/Prodotti';

@Injectable({ providedIn: 'root' })
export class ProductEventService {
  private caricaProdottiSubject = new Subject<void>();
  caricaProdotti$ = this.caricaProdottiSubject.asObservable();

  private modificaPrezzoSubject = new Subject<{ prodotto: Prodotti; nuovoPrezzo: number }>(); // Usa Prodotti
  modificaPrezzo$ = this.modificaPrezzoSubject.asObservable();

  richiediCaricamento(): void {
    this.caricaProdottiSubject.next();
  }

}
