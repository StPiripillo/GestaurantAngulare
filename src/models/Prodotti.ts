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
  prezzo: number,
  Tipologia: Tipologia[],
  intolleranza: string[],
  ingredienti: Ingredienti[],
  qtn: number
}
