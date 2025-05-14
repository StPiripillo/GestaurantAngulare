import {Injectable} from '@angular/core';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../tavolo-repository.service';

@Injectable ({
  providedIn: 'root'
})
export class TavoloGlobaleService {
  TavoliInApp:Tavolo[] = [];
  dragAttivo: boolean = false;
  idTavoloSelezionato: number = 0;

  constructor(private tavoloRepo:TavoloRepositoryService)
  {
    this.ricaricaTavoli();
  }

  ricaricaTavoli()
  {
    this.tavoloRepo.getTavoli().subscribe(arrayTavoliLetti => this.TavoliInApp = arrayTavoliLetti);
  }
}
