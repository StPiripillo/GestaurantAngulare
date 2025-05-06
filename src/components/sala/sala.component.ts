import { Component } from '@angular/core';
import {NgFor} from '@angular/common';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';

@Component({
  selector: 'app-sala',
  imports: [],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent {

  tavoli:Tavolo[] = [];

  constructor(private tRepo:TavoloRepositoryService) {
    this.tRepo.getTavoli()
  }

}
