import { Component } from '@angular/core';
import {NavbarOrdineComponent} from '../navbarOrdine/navbarOrdine.component';

@Component({
  selector: 'app-overlay',
  imports : [NavbarOrdineComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {

}
