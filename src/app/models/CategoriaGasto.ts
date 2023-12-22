import {Imagen} from "./Imagen";

export class CategoriaGasto {
  id: number;
  nombreGasto: string;
  img: Imagen;

  constructor(id: number, nombre:string, img: Imagen) {
    this.id = id;
    this.nombreGasto = nombre;
    this.img = img;
  }
}
