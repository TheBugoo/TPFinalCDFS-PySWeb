import { Propietario } from './propietario';
import { Local } from './locl';

export class Contrato {
    _id: string;
    fecha: Date;
    propietario: Propietario;
    locales: Array<Local> = new Array<Local>()
    costoTotalAlq: number;
    Contrato(_id?: string, fecha?: Date, propietario?: Propietario, locales?: Array<Local>, costoTotalAlq?: number) {
        this._id = _id;
        this.fecha = fecha;
        this.propietario = propietario;
        this.locales= locales;
        this.costoTotalAlq = costoTotalAlq;
    }
}