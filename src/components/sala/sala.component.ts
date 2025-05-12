import {Component, inject, OnInit} from '@angular/core';
import {NgFor, NgForOf} from '@angular/common';
import {Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {CdkDrag, CdkDragEnd, CdkDragMove} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
import {tmplAstVisitAll} from '@angular/compiler';
import {VERSION} from '@angular/cdk';
import {OverlayComponent} from '../overlay/overlay.component';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {TavoloGlobaleService} from '../../services/stato/tavolo-globale.service';

@Component({
  selector: 'app-sala',
  imports: [
    NgForOf,
    CdkDrag,
    FormsModule,
    OverlayComponent
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {

  tavoli: Tavolo[] = [];
  utilizzabile: boolean = true;

  coloriTavolo : string[] = ['green', 'yellow', 'red'];

  constructor(private TavoloRepo: TavoloRepositoryService, public tavoloS: TavoloGlobaleService) {
    this.controllaOra();
  }

  controllaOra(){
    const OraAttuale = new Date().getHours();
    const oraLimite = 20;
    this.utilizzabile = OraAttuale < oraLimite;
  }

  caricaTavoli() {
    this.TavoloRepo.getTavoli().subscribe((data: Tavolo[]) => {
      this.tavoli = data;
    });
  }

  cambiaStato(tavolo: Tavolo): void {
    tavolo.occupato = (tavolo.occupato +1) % 3;
  }

  occupaTavolo(tavolo: Tavolo): void {

  }

  ngOnInit(): void {
    this.TavoloRepo.getTavoli().subscribe((data) => {
      this.tavoli = data;
    });
  }

  salvaPosizione(tavolo: Tavolo): void {
    this.TavoloRepo.updatePosition(tavolo.id, tavolo.x, tavolo.y).subscribe({
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

  cancellaTavolo(tavolo: Tavolo): void {
    if (!this.utilizzabile) {
      alert("Non puoi eliminare i tavoli dopo le 20:00");
      return;
    }
    const confirmDelete = confirm(`Sei sicuro di voler eliminare il tavolo ${tavolo.numeroTavolo}?`);
    if (confirmDelete) {
      this.TavoloRepo.eliminaTavolo(tavolo.id).subscribe(() => {
        alert(`Tavolo ${tavolo.numeroTavolo} eliminato`);
        this.caricaTavoli();
        window.location.reload();
      });
    }

  }

  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  openModal() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    });

    this.overlayRef.backdropClick().subscribe(() => this.overlayRef?.dispose());
    this.overlayRef.attach(new ComponentPortal(OverlayComponent));
  }

  cambioNumero(tavolo: Tavolo): void {
    const nuovoNumero = prompt("Inserisci il nuovo numero del tavolo:");
    if (nuovoNumero) {
      const numero = parseInt(nuovoNumero);
      if (!isNaN(numero)) {
        //questo controlla se il numero gia esiste
        const numeroEsistente = this.tavoli.some(t => t.numeroTavolo === numero && t.id !== tavolo.id);
        if (numeroEsistente) {
          alert("Errore: il numero del tavolo è già esistente.");
          return;
        }

        tavolo.numeroTavolo = numero;
        this.TavoloRepo.updateNomeTavolo(tavolo.id, numero).subscribe(() => {
          alert("Numero tavolo modificato");
          this.caricaTavoli();
        }, error => {
          console.error("Errore durante il salvataggio:", error);
        });
      }
    }
  }


}




