import {CategoriaGasto} from "./CategoriaGasto";
import {Imagen} from "./Imagen";
import {Usuario} from "./Usuario";
import {Grupo} from "./Grupo";

export class Gasto {
  id: number;
  nombre: string;
  categoria: CategoriaGasto;
  monto: number;
  grupo: Grupo;
  fechaGasto: any;
  formaDivision: number;
  img: Imagen;
  usuarioGasto: Usuario;

  constructor(id: number, monto:number, nombre: string, categoria: CategoriaGasto, grupo: Grupo, fecha: any, division: number, img: Imagen, usr: Usuario)
  {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.monto = monto;
    this.grupo = grupo;
    this.fechaGasto = fecha;
    this.formaDivision = division;
    this.img = img;
    this.usuarioGasto = usr;
  }
}
