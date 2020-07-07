import { Usuario } from './../../app/models/usuario';

export class Novedad {
    _id: string;
    usuario: Usuario;
    texto: string;
    estado: string;
    Novedad(_id?: string, usuario?: Usuario, texto?: string, estado?: string) {
        this._id = _id;
        this.texto = texto;
        this.estado = estado;
        this.usuario = new Usuario();
    }
}