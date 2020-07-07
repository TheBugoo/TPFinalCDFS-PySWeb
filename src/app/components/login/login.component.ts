import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','./fonts2/iconos2.css']
})
export class LoginComponent implements OnInit {

  userform: Usuario = new Usuario();
  returnUrl: string;
  msglogin: string;
  perfil: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService:LoginService, private _toastr:ToastrService) { 
    }
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';      
  }

  public login() {
    this.loginService.login(this.userform.usuario, this.userform.password)
        .subscribe(
            (result) => {
                  var user = result;
                  if (user.status == 1){
                      //vbles para mostrar-ocultar cosas en el header
                      sessionStorage.setItem("token", user.token);
                      this.loginService.userLoggedIn = true;
                      this.loginService.userLogged = user;
                      this.perfil = user['perfil'];
                      this._toastr.success(this.perfil);
                      //redirigimos a home o a pagina que llamo
                      this.router.navigateByUrl(this.returnUrl);
                  } else {
                    //usuario no encontrado  muestro mensaje en la vista
                    this._toastr.error("Credenciales incorrectas..");
			}
            },
            error => {
                console.log("error en conexion");
                console.log(error);
            });
  }
}
