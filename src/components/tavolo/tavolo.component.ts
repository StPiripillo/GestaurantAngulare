import { Component, Input } from '@angular/core';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';

@Component({
  selector: 'app-tavolo',
  imports : [],
  templateUrl: './tavolo.component.html',
  styleUrl: './tavolo.component.css'
})
export class TavoloComponent {
  @Input() numeroTavolo: number | undefined;
  showMenu: boolean = false;

  constructor(private TavoloRepo: TavoloRepositoryService ) { }

  onDeleteTable() {
    if (this.numeroTavolo) {
      const confirmDelete = confirm(`Sei sicuro di voler eliminare il tavolo ${this.numeroTavolo}?`);
      if (confirmDelete)
        this.TavoloRepo.eliminaTavolo(this.numeroTavolo).subscribe(() => {
          console.log(`Tavolo ${this.numeroTavolo} eliminato`);
        })
    }
    else
    {
      alert(`Il tavolo ${this.numeroTavolo} non esiste!`);
    }
  }



}

