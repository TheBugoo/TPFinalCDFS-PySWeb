import { Component, OnInit } from '@angular/core';
import { Propietario } from './../../models/propietario';
import { PropietarioService } from './../../services/propietario.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import * as printJS from 'print-js';
import jsPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-propietario',
  templateUrl: './propietario.component.html',
  styleUrls: ['./propietario.component.css']
})
export class PropietarioComponent implements OnInit {

  propietario: Propietario;
  propietarios: Array<Propietario>;
  validador: boolean;

  constructor(private propietarioService: PropietarioService, private _toastr:ToastrService, public loginService: LoginService) { 
    this.propietario = new Propietario();
    this.propietarios = new Array<Propietario>();
    this.validador=true;
    this.obtenerPropietario();

  }
  enviarPropietario() {
    this.validarIngreso();
    if(this.validador==true){
    this.propietarioService.addMensaje(this.propietario).subscribe(
      (result) => {
        this._toastr.success("Propietario agregado","Exito");
        this.obtenerPropietario();
      },
      (error) => {
        console.log("Error");
      }
    )
    }
    else{
      this._toastr.error("Debe completar todos los campos antes de ingresar","Error")
    }
    this.propietario = new Propietario();
  }
  guardarPropietario() {
    this.propietarioService.addMensaje(this.propietario);
    this.propietario = new Propietario();
    this.obtenerPropietario();
  }
  borrarPropietario(prop: Propietario) {
    this.propietarioService.deletePropietario(prop).subscribe(
      (result) => {
        this._toastr.success("Propietario eliminado","Exito");
        this.obtenerPropietario();
      },
      (error) => {
        console.log("Error");
      }
    )
  }
  obtenerPropietario() {
    //this.asistentes = this.asistenteService.getAsistente();
    this.propietarios = new Array<Propietario>();
    var prop: Propietario = new Propietario();
    this.propietarioService.getPropietario().subscribe(
      (result) => {
        result.forEach(element => {
          Object.assign(prop, element);
          this.propietarios.push(prop);
          prop = new Propietario();
        });
      },
      (error) => {
        console.log("Error");
      }
    )
  }
  validarIngreso(){
    if(this.propietario.apellido==""||this.propietario.dni==null||this.propietario.apellido==""||this.propietario.nombres==""||this.propietario.telefono==null){
      this.validador=false;
    }
    else{
      this.validador=true;
    }
  }
  modificarPropietario() {
    this.validarIngreso();
    console.log(this.validador)
    if(this.validador==true){
    this.propietarioService.upDateMensaje(this.propietario).subscribe(
      (result) => {
        this._toastr.success("Propietario modificado","Exito");
        this.obtenerPropietario();
      },
      (error) => {
        console.log("Error");
      }
    )
  }
  else
  {
    this._toastr.error("Debe completar todos los campos antes de modificar","Error")
  }
    this.propietario = new Propietario();
  }
  limpiarPropietario() {
    this.propietario = new Propietario();
  }
  elegirPropietario(prop: Propietario) {
    this.propietario = prop;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onSubmit(form: NgForm) {
    form.resetForm();
  }
  ngOnInit(): void {}

  public printJS(){
    printJS('printJS-form', 'html')
  }
 
  public generarPDF(){
    var doc = new jsPDF();
    doc.text('PROPIETARIOS', 90,15)
    doc.fromHTML($('#printJS-form').get(0),15,25) 
    doc.save('inquilinos table pdf')
  }

}
