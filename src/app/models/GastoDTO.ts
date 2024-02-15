import {CategoriaGasto} from "./CategoriaGasto";
import {Imagen} from "./Imagen";
import {FormasDivision} from "./FormasDivision";

export class GastoDTO {
  nombre: string;
  categoria: CategoriaGasto;
  monto: number;
  grupo: number;
  fechaGasto: any;
  formaDivision: FormasDivision;
  img: Imagen;


  constructor(monto:number, nombre: string, categoria: CategoriaGasto, grupo: number, fecha: any, division: FormasDivision, imagen: Imagen)
  {
    this.nombre = nombre;
    this.categoria = categoria;
    this.monto = monto;
    this.grupo = grupo;
    this.fechaGasto = fecha;
    this.formaDivision = division;
    this.img = imagen;
  }
}
