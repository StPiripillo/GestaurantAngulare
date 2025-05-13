import {Ingredienti} from './Ingredienti';

export enum Tipologia
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
  Tip: Tipologia,
  intolleranze: string[],
  qtn: number
}
