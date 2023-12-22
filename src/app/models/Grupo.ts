import {CategoriaGrupo} from "./CategoriaGrupo";

export class Grupo {
  id: number;
  nombre: string;
  categoria: number;

  constructor(id: number, nombre: string, categoria: number)
{
  this.id = id;
  this.nombre = nombre;
  this.categoria = categoria;
}
}

