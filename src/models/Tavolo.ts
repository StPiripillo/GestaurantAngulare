
export interface Tavolo
{
  id?:number,
  numeroTavolo:number,
  Forma:Forma[],
  Dimensione:Dimensione[],
  occupato:boolean,
  posti:number
  x:number,
  y:number
}

export enum Forma
{
  QUADRATO = 'Quadrato',
  RETTANGOLO = 'Rettangolo',
  ROTONDO = 'Rotondo'
}

export enum Dimensione
{
  PICCOLO = 'Piccolo',
  MEDIO = 'Medio',
  GRANDE = 'Grande'
}
