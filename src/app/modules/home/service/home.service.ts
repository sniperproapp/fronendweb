import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  homecategoria(TIME_NOW:any){
    let URL = URL_SERVICIOS+"categoriescursos/findtienda/"+TIME_NOW;
    return this.http.get(URL);
  }


  homecursos(TIME_NOW:any){
    let URL = URL_SERVICIOS+"courses/findtienda" 
    return this.http.get(URL);
  }

  homecursoscategori(){
    let URL = URL_SERVICIOS+"categoriescursos/findtiendacategoriacurso/0"
    return this.http.get(URL);
  }


  homecursoscategoridescuetobaner(){
    let URL = URL_SERVICIOS+"discount/findtiendabaner/0"
    return this.http.get(URL);
  }

  homecursoscategoridescuetoflash(){
    let URL = URL_SERVICIOS+"discount/findtiendaflash/0"
    return this.http.get(URL);
  }

  
}
