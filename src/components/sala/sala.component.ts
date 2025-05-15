import {Component, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
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
    NgIf,
    NgStyle
  ],
  templateUrl: './sala.component.html',
  styleUrl: './sala.component.css'
})
export class SalaComponent implements OnInit {


  utilizzabile: boolean = true;
  tavoloHoverId: number | null = null;
  isDragging = false;

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

  onDragStart() {
    this.isDragging = true;
  }

  onDragEnd() {
    this.isDragging = false;
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

  tavoloDaEliminare: Tavolo | null = null;
  mostraConfermaEliminazione: boolean = false;

  apriConfermaEliminazione(tavolo: Tavolo): void {
    this.tavoloDaEliminare = tavolo;
    this.mostraConfermaEliminazione = true;
  }

  confermaEliminazione(): void {
    if (this.tavoloDaEliminare) {
      this.TavoloRepo.eliminaTavolo(this.tavoloDaEliminare.id).subscribe(() => {
        this.caricaTavoli();
        this.mostraConfermaEliminazione = false;
        this.tavoloDaEliminare = null;
      });
    }
  }

  annullaEliminazione(): void {
    this.mostraConfermaEliminazione = false;
    this.tavoloDaEliminare = null;
  }

  cancellaTavolo(tavolo: Tavolo): void {
    if (!this.utilizzabile) {
      this.apriConfermaEliminazione(tavolo);
      return;
    }
    this.apriConfermaEliminazione(tavolo);
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

  mostraModaleConto: boolean = false;

  apriModaleConto(tavolo: Tavolo): void {
    this.mostraModaleConto = true;
  }

  chiudiModaleConto(): void {
    this.mostraModaleConto = false;
  }

  confermaStampaConto(tavolo: Tavolo): void {
    this.TavoloRepo.eliminaOrdini(tavolo.id).subscribe(() => {
      tavolo.occupato = 0; // Stato "libero"
      this.TavoloRepo.updateOccupato(tavolo.id, tavolo.occupato).subscribe(() => {
        alert(`Il conto è stato stampato e il tavolo ${tavolo.numeroTavolo} è ora libero.`);
        this.mostraModaleConto = false;
        this.caricaTavoli();
      });
    });
  }


  protected readonly Forma = Forma;
  protected readonly Dimensione = Dimensione;
}




