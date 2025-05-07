import {Prodotti} from './Prodotti';

export interface Ingredienti extends Prodotti{
  id: number;
  nome: string;
  prezzo: number;
}
