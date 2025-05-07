import { Component, Input } from '@angular/core';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-tavolo',
  imports: [
    NgStyle
  ],
  templateUrl: './tavolo.component.html',
  styleUrl: './tavolo.component.css'
})
export class TavoloComponent {
  @Input() numeroTAvolo: number | undefined;
  showMenu: boolean = false;

  constructor(private TavoloRepo: TavoloRepositoryService ) { }

  onDeleteTable() {
    if (this.numeroTAvolo) {
      const confirmDelete = confirm(`Sei sicuro di voler eliminare il tavolo ${this.numeroTAvolo}?`);
      if (confirmDelete)
        this.TavoloRepo.eliminaTavolo(this.numeroTAvolo).subscribe(() => {
          console.log(`Tavolo ${this.numeroTAvolo} eliminato`);
        })
    }
    else
    {
      alert(`Il tavolo ${this.numeroTAvolo} non esiste!`);
    }
  }



}

