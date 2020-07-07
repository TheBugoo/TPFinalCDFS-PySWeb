export class Usuario {
    _id: number;
    usuario: string;
    password: string;
    activo:boolean;
    perfil: string;

    Usuario(id?:number, usuario?:string, password?:string, perfil?:string, activo?:boolean){
      this._id = id;
      this.usuario = usuario;
      this.password = password;
      this.activo = activo;
      this.perfil = perfil;
    }
}