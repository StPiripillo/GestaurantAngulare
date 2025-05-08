import { Component, Input, OnInit } from '@angular/core';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {Tavolo} from '../../models/Tavolo';

@Component({
  selector: 'app-tavolo',
  templateUrl: './tavolo.component.html',
  styleUrl: './tavolo.component.css'
  })
  export class TavoloComponent implements OnInit {
  @Input() numeroTavolo: number | undefined;
  showMenu: boolean = false;


  tavoli: Tavolo[] = [];

  constructor(private TavoloRepo: TavoloRepositoryService ) { }

  ngOnInit(): void {
    this.TavoloRepo.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

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

