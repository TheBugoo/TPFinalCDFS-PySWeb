import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Usuario } from 'src/app/models/usuario';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('child1') childOne:LoginComponent;
  returnUrl: string;
  perfil:string;
  user:any;
  message:string;
  usuarioLog: Array<Usuario>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public loginService:LoginService, private _toastr:ToastrService) { 
      this.usuarioLog = new Array<Usuario>();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
    /* this.childOne.perfil = this.perfil; */
  }

  public logout(){
    this.loginService.logout();
    this.router.navigateByUrl(this.returnUrl);
    this._toastr.error("Ha cerrado sesion");
  }

}
