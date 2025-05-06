import {Ingredienti} from './Ingredienti';

export interface Prodotti
{
  id: number,
  nome: string,
  prezzo: number,
  tipologia: string[],
  intolleranza: string[],
  ingredienti: Ingredienti[],
  qtn: number
}
