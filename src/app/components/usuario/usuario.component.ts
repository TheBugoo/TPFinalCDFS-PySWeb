import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';
import jsPDF from 'jspdf';
import * as $ from 'jquery';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

    
  user:Usuario;
  usuarios:Array<Usuario>;
  existeUser:boolean = false;

  constructor(private usuarioService:UsuarioService, private _toastr:ToastrService,public loginService:LoginService) { 
    this.user = new Usuario ();
    this.usuarios = new Array<Usuario>();
    this.refrescarUsuarios();
  }
  public printJS(){
    printJS('printJS-form', 'html')
  }
 
  public generarPDF(){
    var doc = new jsPDF();
    doc.text('USUARIOS', 90,15)
    doc.fromHTML($('#printJS-form').get(0),15,25) 
    doc.save('usuarios table pdf')
  }

  ngOnInit(): void {
    console.log(this.user.activo)
  }
  refrescarUsuarios(){
    this.user = new Usuario ();
    this.usuarios = new Array<Usuario>();
    this.usuarioService.getUsuarios().subscribe(
      (result)=>{
        result.forEach(element => {
          Object.assign(this.user,element);
          this.usuarios.push(this.user);
          this.user= new Usuario();
        });
      },
      (error) => {
        console.log(error)
      }
    )
  }
  altaUsuario(){
    for(var i in this.usuarios){
      if(this.usuarios[i].usuario == this.user.usuario && this.usuarios[i].perfil== this.user.perfil ){
        this.existeUser = true;
      }
    }

    if(this.existeUser){
      this._toastr.error("Usuario existente!!" , "Error")
    }else{
      this.usuarioService.addUsuario(this.user).subscribe(
        (result) => {
          console.log(result)
          this._toastr.success("Usuario creado","Exito")
          this.refrescarUsuarios();
        },
        (error) =>{
          this._toastr.error(error, "Error")
        }
      )
      this.refrescarUsuarios();
      this.user = new Usuario();
      console.log(this.usuarios);
    }
  }
  modificarUsuario(){
    for(var i in this.usuarios){
      if(this.usuarios[i].usuario == this.user.usuario && this.usuarios[i].perfil== this.user.perfil && this.usuarios[i].activo == this.user.activo ){
        this.existeUser = true;
      }
    }
    if(this.existeUser){
      this._toastr.error("El usuario ya existe")
    }else{
      this.usuarioService.updateUsuario(this.user).subscribe(
        (result) =>{
          this.refrescarUsuarios();
          this._toastr.info("Usuario modificado")
          this.user = new Usuario();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  borrarUsuario(id:string){
    this.usuarioService.deleteUsuario(id).subscribe(
      (result) => {
        this._toastr.success("Usuario eliminado","Exito")
        this.refrescarUsuarios();
      },
      (error) => {
        this._toastr.error(error, "Error")
      }
    );
    this.user = new Usuario();
    
  }
  limpiar(){
    this.user = new Usuario();
  }

  public limpiarFormulario(form: NgForm) {
    form.resetForm();
  }

  elegirUsuario(usuario:Usuario){
    var tusuario = new Usuario();
    Object.assign(tusuario,usuario);
    this.user = tusuario;
  }
}
