import {Component, OnInit} from '@angular/core';
import {NgFor, NgForOf} from '@angular/common';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {CdkDrag, CdkDragMove} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sala',
  imports: [
    NgForOf,
    CdkDrag
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {

  tavoli: Tavolo[] = [];

  constructor(private TavoloRepo: TavoloRepositoryService ) { }

  caricaTavoli() {
    this.TavoloRepo.getTavoli().subscribe((data: Tavolo[]) => {
      this.tavoli = data;
    });
  }

  ngOnInit(): void {
    this.TavoloRepo.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

  onDragMoved(event: CdkDragMove, tavolo: Tavolo): void {
    const el = event.source.element.nativeElement;
    const x = event.pointerPosition.x - el.offsetWidth / 2;
    const y = event.pointerPosition.y - el.offsetHeight / 2;

    tavolo.x = x;
    tavolo.y = y;

    this.TavoloRepo.updatePosition(tavolo.id, x, y).subscribe();
  }
}
