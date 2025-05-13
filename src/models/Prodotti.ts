import {Ingredienti} from './Ingredienti';

export enum Tip
{
  PRIMI=  "Primi",
  SECONDI= "Secondi",
  ANTIPASTI= "Antipasti",
  CONTORNI= "Contorni",
  BEVANDE= "Bevande",
  DOLCI= "Dolci",
}

export interface Prodotti
{
  id: number,
  nome: string,
  descrizione: string,
  prezzo: number,
  tipologia: Tip[],
  intolleranze: string[],
  qtn: number
}
