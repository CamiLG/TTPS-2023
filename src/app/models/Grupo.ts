import {CategoriaGrupo} from "./CategoriaGrupo";

export class Grupo {
  id: number;
  nombre: string;
  categoria: CategoriaGrupo;

  constructor(id: number, nombre: string, categoria: CategoriaGrupo)
{
  this.id = id;
  this.nombre = nombre;
  this.categoria = categoria;
}
}

