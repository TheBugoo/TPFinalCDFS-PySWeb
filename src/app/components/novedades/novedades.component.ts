import { Component, OnInit } from '@angular/core';
import { Novedad } from './../../models/novedad';
import { NovedadService } from 'src/app/services/novedad.service';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import jsPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  novedad: Novedad;
  novedades: Array<Novedad>;

  constructor(private novedadService: NovedadService, public loginService: LoginService, private toastrService: ToastrService) {

    this.novedad = new Novedad();
    this.novedades = new Array<Novedad>();

    this.obtenerNovedad();
  }




  enviarNovedad() {

    this.novedadService.addNovedad(this.novedad).subscribe(

      (result) => {

        this.toastrService.success("Novedad Enviada", "Exito")


      },
      (error) => {
        console.log("Error");

      }
    )


    this.novedad = new Novedad();




  }
  guardarNovedad() {

    this.novedad.estado = "Pendiente";
    this.novedad.usuario = this.loginService.userLogged;

    this.novedadService.addNovedad(this.novedad).subscribe(

      (result) => {

        this.toastrService.success("Novedad Enviada", "Exito")

      },
      (error) => {
        this.toastrService.error("Se esta trabajando en ello , vuelva pronto", "Error")

      }
    )

    this.novedad = new Novedad();


  }
  borrarNovedad(nov: Novedad) {

    this.novedadService.deleteNovedad(nov).subscribe(
      (result) => {
        this.toastrService.success("Novedad Eliminada", "Exito")
        this.obtenerNovedad();
      },
      (error) => {
        this.toastrService.error("Se esta trabajando en ello", "Error")

      }
    )
    this.obtenerNovedad();
  }
  obtenerNovedad() {
    //this.asistentes = this.asistenteService.getAsistente();
    this.novedades = new Array<Novedad>();
    var nov: Novedad = new Novedad();
    this.novedadService.getNovedad().subscribe(
      (result) => {
        result.forEach(element => {
          Object.assign(nov, element);
          this.novedades.push(nov);
          nov = new Novedad();

        })
      },
      (error) => {
        this.toastrService.error("Se esta trabajando en ello", "Error")

      }
    )


  }

  modificarNovedad(item: Novedad) {
    this.novedad = item;
    this.novedad.estado = "Procesado";
    this.novedadService.upDateNovedad(this.novedad).subscribe(

      (result) => {
        this.toastrService.success("Novedad Procesada", "Exito")
        this.obtenerNovedad();

      },
      (error) => {
        this.toastrService.error("Se esta trabajando en ello , vuelva pronto", "Error")

      }
    )


    this.novedad = new Novedad();


  }
  limpiarNovedad() {
    this.novedad = new Novedad();
  }
  elegirNovedad(nov: Novedad) {
    console.log(nov);
    this.novedad = nov;
  }
  public onSubmit(form: NgForm) {
    form.resetForm();


  }



  ngOnInit(): void { }
  public printJS(){
    printJS('printJS-form', 'html')
  }
 
  public generarPDF(){
    var doc = new jsPDF();
    doc.text('NOVEDADES', 90,15)
    doc.fromHTML($('#printJS-form').get(0),15,25) 
    doc.save('novedades table pdf')
  }

}