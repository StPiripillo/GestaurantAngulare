import {Ingredienti} from './Ingredienti';
export enum Intolleranze
{
  GLUTINE= "GLUTINE",
  LATTOSIO= "LATTOSIO",
  SOLFITI= "SOLFITI",
  CONSERVANTI= "CONSERVANTI",
  NESSUNA= "NESSUNA",

}
export enum Tipologia
{
  PRIMI=  "PRIMI",
  SECONDI= "SECONDI",
  ANTIPASTI= "ANTIPASTI",
  CONTORNI= "CONTORNI",
  BEVANDE= "BEVANDE",
  DOLCI= "DOLCI",
}

export interface Prodotti
{
  id: number,
  nome: string,
  descrizione: string,
  prezzo: number,
  tipologia: Tipologia,
  intolleranze: Intolleranze,
  qtn: number
}
