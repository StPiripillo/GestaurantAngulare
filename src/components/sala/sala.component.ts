import {Component, OnInit} from '@angular/core';
import {NgFor, NgForOf} from '@angular/common';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {CdkDrag, CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-sala',
  imports: [
    NgForOf,
    CdkDrag,
    FormsModule
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

  onDragMoved(event: CdkDragMove): void {

  }

  //onDragEnded(event: CdkDragEnd, tavolo: Tavolo): void {
  //  const pos = event.source.getFreeDragPosition();
  //  tavolo.x = pos.x;
  //  tavolo.y = pos.y;
   // this.salvaPosizione(tavolo);
 // }

  salvaPosizione(tavolo: Tavolo): void {
    this.TavoloRepo.updatePosition(tavolo.id, tavolo.x, tavolo.y).subscribe({
      next: () => alert(`Salvato tavolo ${tavolo.id} in posizione (${tavolo.x}, ${tavolo.y})`),
      error: (err) => console.error('Errore salvataggio', err)
    });
  }
  onDragEnded(event: any, tavolo: Tavolo): void {
    const pos = event.source.getFreeDragPosition();

    const snap = (val: number) => Math.round(val / 20) * 20;

    const snappedX = snap(pos.x);
    const snappedY = snap(pos.y);

    tavolo.x = snappedX;
    tavolo.y = snappedY;

    this.salvaPosizione(tavolo);
  }
}
