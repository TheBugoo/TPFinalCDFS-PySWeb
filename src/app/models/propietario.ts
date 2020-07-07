export class Propietario {
    _id: string;
    apellido: string;
    nombres: string;
    dni: number;
    email: string;
    telefono: number;
    Propietario(_id?: string, apellido?: string, nombres?: string, dni?: number, email?: string, telefono?: number) {
        this._id = _id;
        this.apellido = apellido;
        this.nombres = nombres;
        this.dni= dni;
        this.email = email;
        this.telefono = telefono;
    }
}