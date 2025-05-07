import {Component, OnInit} from '@angular/core';
import {NgFor, NgForOf} from '@angular/common';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';

@Component({
  selector: 'app-sala',
  imports: [
    NgForOf
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent{

  tavoli:Tavolo[] = [];

  constructor(private tRepo:TavoloRepositoryService) {
  }

  caricaTavoli() {
    this.tRepo.getTavoli().subscribe((data: Tavolo[]) => {
      this.tavoli = data;
    });
  }

  ngOnInit() {
    this.tRepo.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }


}
