import { Component, Input, OnInit } from '@angular/core';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {Tavolo} from '../../models/Tavolo';

@Component({
  selector: 'app-tavolo',
  templateUrl: './tavolo.component.html',
  styleUrl: './tavolo.component.css'
  })
  export class TavoloComponent implements OnInit {
  @Input() numeroTAvolo: number | undefined;
  showMenu: boolean = false;

  tavoli: Tavolo[] = [];

  constructor(private TavoloRepo: TavoloRepositoryService ) { }

  ngOnInit(): void {
    this.TavoloRepo.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

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

