import {CategoriaGasto} from "./CategoriaGasto";

export class Gasto {
  id: number;
  nombre: string;
  categoria: CategoriaGasto;
  monto: number;


  constructor(id: number, monto:number, nombre: string, categoria: CategoriaGasto)
  {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.monto = monto;
  }
}
