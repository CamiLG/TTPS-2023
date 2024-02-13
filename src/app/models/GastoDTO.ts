import {CategoriaGasto} from "./CategoriaGasto";

export class Gasto {
  id: number;
  nombre: string;
  categoria: CategoriaGasto;
  monto: number;
  grupo: number;
  fecha: string;
  division: number;


  constructor(id: number, monto:number, nombre: string, categoria: CategoriaGasto, grupo: number, fecha: string, division: number)
  {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.monto = monto;
    this.grupo = grupo;
    this.fecha = fecha;
    this.division = division;
  }
}
