import { Component } from '@angular/core';
import {OrdineComponent} from '../ordine/ordine.component';

@Component({
  selector: 'app-overlay',
  imports : [OrdineComponent],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.css'
})
export class OverlayComponent {

}
