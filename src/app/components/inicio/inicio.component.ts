import { Component, OnInit } from '@angular/core';
import { Noticia } from './../../models/noticia';
import { Comentarios } from './../../models/comentarios';
import { NoticiasService } from 'src/app/services/noticias.service';
import { ComentariosService } from 'src/app/services/comentarios.service';
import { LoginService } from 'src/app/services/login.service';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import jsPDF from 'jspdf';
import * as $ from 'jquery';
import { FacebookService, InitParams, LoginResponse } from 'ngx-fb';
import { ApiMethod } from 'ngx-fb/dist/esm/providers/facebook';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  bandera: boolean;
  bandera2:boolean;
  bandera3:boolean;
  tamMaxText: number = 325;
  tamTexto: number;
  valor: number;
  noticia: Noticia;
  noticias: Array<Noticia>;
  noticiaVig: Array<Noticia>;
  comentario: Comentarios;
  comentarios: Array<Comentarios>;
  existeTitulo:boolean = false;
  mensaje:string="";

  constructor(private noticiaService:NoticiasService, public loginService:LoginService, private comentarioService:ComentariosService, private _toastr:ToastrService, private fb: FacebookService) {
    this.bandera = false;
    this.bandera2 = false;
    this.bandera3 = false;
    this.noticia = new Noticia();
    this.noticias = new Array<Noticia>();
    this.comentario = new Comentarios();
    this.comentarios = new Array<Comentarios>();
    this.noticiaVig = new Array<Noticia>();
    this.noticia.usuario = this.loginService.userLogged;

    this.refreshNoticiasVigentes();
    this.refreshNoticias();
    this.refreshComentarios();
    this.iniciarFb();
   }
 
   public seleccionarAsistente(notic: Noticia) {
    var notiselec = new Noticia();
    Object.assign(notiselec, notic);
    this.noticia = notiselec;
  }
  public agregarNoticia() {
    for (var i in this.noticias) {
      if (this.noticias[i].titulo == this.noticia.titulo) {
        this.existeTitulo = true;
      }
    }
    if (this.existeTitulo) {
      this._toastr.error("Titulo es repetido");
    } else{
    this.noticia.usuario = new Usuario();
    this.noticia.vigente = false;
    this.noticia.usuario._id = this.loginService.userLogged._id;
    this.noticia.fecha = new Date();
    this.noticiaService.addNoticias(this.noticia).subscribe(
      (res) => {
        this._toastr.success('Noticia Guardada con exito!');
        this.refreshNoticias();
        this.noticia = new Noticia();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
}
  public borrarNoticia(notic: Noticia) {
    this.noticiaService.deleteNoticias(notic).subscribe(
      (res) => {
        this._toastr.success('Noticia Borrada exitosamente');
        this.refreshNoticias();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  public actualizarNoticia() {
    this.noticiaService.updateNoticias(this.noticia).subscribe(
      (res) => {
        this._toastr.success('Noticia MODIFICADA con exito!');
        this.refreshNoticias();
        this.refreshNoticiasVigentes();
        this.noticia = new Noticia();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  public limpiarNoticia() {
    this.noticia = new Noticia();
  }
  public limpiarFormulario(form: NgForm) {
    form.resetForm();
  }
  public seleccionarNoticia(notici: Noticia) {
    var noticiasele = new Noticia();
    Object.assign(noticiasele, notici);
    this.noticia = noticiasele;
  }
  public refreshNoticias() {
    this.noticia = new Noticia();
    this.noticias = new Array<Noticia>();
    this.noticiaService.getNoticias().subscribe(
      (result) => {
        result.forEach((element) => {
          Object.assign(this.noticia, element);
          this.noticias.push(this.noticia);
          this.noticia = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public refreshNoticiasVigentes() {
    this.noticia = new Noticia();
    this.noticiaVig = new Array<Noticia>();
    this.noticiaService.getNoticiaVigente().subscribe(
      (result) => {
        result.forEach((element) => {
          Object.assign(this.noticia, element);
          this.noticiaVig.push(this.noticia);
          this.noticia = new Noticia();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public refreshComentarios() {
    this.comentario = new Comentarios();
    this.comentarios = new Array<Comentarios>();
    this.comentarioService.getComentarios().subscribe(
      (result) => {
        result.forEach((element) => {
          Object.assign(this.comentario, element);
          this.comentarios.push(this.comentario);
          this.comentario = new Comentarios();
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
  public agregarComentarios() {
    this.comentario.fecha = new Date();
    this.comentarioService.addComentario(this.comentario).subscribe(
      (res) => {
        this._toastr.success('Comentario Guardado con exito!');
        console.log(res);
        this.refreshComentarios();
        this.comentario = new Comentarios();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  public borrarComentario(coment: Comentarios) {
    this.comentarioService.deleteComentario(coment).subscribe(
      (res) => {
        console.log(res);
        this._toastr.success('Comentario ha sido Borrado');
        this.refreshComentarios();
      },
      (err) => {
        console.log('error', err);
      }
    );
  }
  public printJS(){
    printJS('printJS-form', 'html')
  }
  public generarPDF(){
    var doc = new jsPDF();
    doc.text('Noticias del dia', 90,15)
    doc.fromHTML($('#printJS-form').get(0),15,25)
    doc.save('tabla pdf')
  }

  ngOnInit(): void {
    this.bandera = true;
    console.log(this.noticia.usuario);
    }
  iniciarFb(){
    let initParams: InitParams = {
    appId: '626669444891908',
    autoLogAppEvents : true,
    xfbml : true,
    version : 'v7.0'
    };
    this.fb.init(initParams);
  }
  postFb(){
    var apiMethod: ApiMethod = "post";
    this.fb.api('101393734983382/feed', apiMethod,
    {
      "message": this.mensaje,
      "access_token":"EAAI589mnhQQBAOisksXNji4QuCq1Fzgq4bnbclu0Lo8GONmR8IOhMUYLoV1bMoT5g5ebNqH38MxZASfIZCZBn040u8DIvortb6P32qFP3oPMstzYPFNDwCJZAcDoGRLCjwdObOFmZBZBearfOHvdZAbf9mIbzILyTMj4DAhWR4y51kRkXCbYEXABLDcjFQKfRDRZAPU0fzmwbQZDZD"
    });
  }
  public cleanNoticia() {
    this.noticia = new Noticia();
  }
  public escogerNoticias(){
    this.bandera2 = false;
    this.bandera3 = false;
    this.bandera = true;
  }
  public escogerNovedades(){
    this.bandera = false;
    this.bandera3 = false;
    this.bandera2 = true;
  }
  public escogerComentarios(){
    this.bandera = false;
    this.bandera2 = false;
    this.bandera3 = true;
  }
  public cambiarTamTexto() {
    this.tamTexto = this.noticia.descripcion.length;
    this.valor = this.tamMaxText - this.tamTexto;
  }
}