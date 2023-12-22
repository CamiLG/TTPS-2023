import {CategoriaGrupo} from "./CategoriaGrupo";

export class GrupoDTO {
  nombre: string;
  categoria: CategoriaGrupo;

  constructor(nombre: string, categoria: CategoriaGrupo)
  {
    this.nombre = nombre;
    this.categoria = categoria;
  }
}
