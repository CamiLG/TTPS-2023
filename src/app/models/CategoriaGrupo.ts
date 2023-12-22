import {Imagen} from "./Imagen";

export class CategoriaGrupo {
  id: number;
  nombreGrupo: string;
  img: Imagen;

  constructor(id: number, nombre:string, img: Imagen) {
    this.id = id;
    this.nombreGrupo = nombre;
    this.img = img;
  }
}
