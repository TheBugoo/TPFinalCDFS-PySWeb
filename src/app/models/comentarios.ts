export class Comentarios {
    _id: string;
    texto: string;
    fecha:Date;

    Comentario(texto?:string, _id?:string, fecha?:Date){
      this.texto = texto;
      this._id = _id;
      this.fecha = fecha;
    }
}
