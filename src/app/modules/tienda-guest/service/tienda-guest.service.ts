import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TiendaGuestService {

  constructor(
    public http: HttpClient
  ) { }

  showCourse(slug:any,CAMPAING_SPECIAL = null){
    let URL = URL_SERVICIOS+"courses/landingcurso/"+slug+"?TIME_NOW="+(new Date().getTime())+"&CAMPAING_SPECIAL="+(CAMPAING_SPECIAL ? CAMPAING_SPECIAL : '');
    return this.http.get(URL);
  }


  homecursoscategory(id:any){
    let URL = URL_SERVICIOS+"courses/findtiendacategory/"+id 
    return this.http.get(URL);
  }
  homecursosuser(id:any){
    let URL = URL_SERVICIOS+"courses/findtiendauser/"+id 
    return this.http.get(URL);
  }
}
