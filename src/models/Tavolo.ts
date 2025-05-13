
export interface Tavolo
{
  id?:number,
  numeroTavolo:number,
  forma:Forma,
  dimensione:Dimensione,
  occupato:number,
  posti:number
  x:number,
  y:number
}

export enum Forma
{
  QUADRATO = 'QUADRATO',
  RETTANGOLO = 'RETTANGOLO',
  ROTONDO = 'ROTONDO'
}

export enum Dimensione
{
  PICCOLO = 'PICCOLO',
  MEDIO = 'MEDIO',
  GRANDE = 'GRANDE'
}
