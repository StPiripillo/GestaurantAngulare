import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Dimensione, Forma, Tavolo} from '../../models/Tavolo';
import {TavoloRepositoryService} from '../../services/tavolo-repository.service';
import {CdkDrag} from '@angular/cdk/drag-drop';
import {FormsModule} from '@angular/forms';
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
    NgClass,
    NgIf
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {


  utilizzabile: boolean = true;

  coloriTavolo : string[] = ['#1b980d', '#afb513', '#bc1010'];

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
      this.tavoloS.TavoliInApp = data;
    });
  }

  cambiaStato(tavolo: Tavolo): void {
    tavolo.occupato = (tavolo.occupato +1) % 3;
    this.TavoloRepo.updateOccupato(tavolo.id, tavolo.occupato).subscribe(() => {
      this.caricaTavoli();
    }, error => {
      alert("Errore durante il salvataggio");
      console.error("Errore durante il salvataggio:", error);
    });
  }


  ngOnInit(): void {
    this.TavoloRepo.getTavoli().subscribe((data) => {
      this.tavoloS.TavoliInApp = data;
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

  mostraDialog: boolean = false;
  nuovoNumero=0;

  nuovoProdottoDialog(): void {
    this.nuovoNumero = 0;  // Reset dei dati
    this.mostraDialog = true;
  }

  chiudiProdDialog(): void {
    this.mostraDialog = false;
  }

  cambioNumero(tavolo: Tavolo): void {
    if (this.nuovoNumero) {
      if (!isNaN(this.nuovoNumero)) {
        tavolo.numeroTavolo = this.nuovoNumero;
        this.chiudiProdDialog();
        this.TavoloRepo.updateNomeTavolo(tavolo.id, tavolo.numeroTavolo).subscribe(() => {
          this.caricaTavoli();

          window.location.reload();
        }, error => {
          console.error("Errore durante il salvataggio:", error);
        });
      }
    }
  }

  protected readonly Forma = Forma;
  protected readonly Dimensione = Dimensione;
}




