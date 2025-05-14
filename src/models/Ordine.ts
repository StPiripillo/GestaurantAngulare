import {Prodotti} from './Prodotti';

export interface Ordine
{
  tavoloId: number;
  id?: number;
  tavolo: number
  totale: number;
  stato: boolean;
  nomeOrdine: string;
  noteOrdine: string;
  prodotti:Prodotti;

}
