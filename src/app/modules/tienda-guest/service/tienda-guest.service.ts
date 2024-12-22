import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TiendaGuestService {

  constructor(
    public http: HttpClient,
    public authService:AuthService,
  ) { }

  showCourse(slug:any,CAMPAING_SPECIAL = null){
    let headers = new HttpHeaders({'Authorization': this.authService.token?this.authService.token:''});

    if(headers){
      let URL = URL_SERVICIOS+"courses/landingcurso/"+slug+"?TIME_NOW="+(new Date().getTime())+"&CAMPAING_SPECIAL="+(CAMPAING_SPECIAL ? CAMPAING_SPECIAL : '');
      return this.http.get(URL,{headers: headers});
    }else{
      let URL = URL_SERVICIOS+"courses/landingcurso/"+slug+"?TIME_NOW="+(new Date().getTime())+"&CAMPAING_SPECIAL="+(CAMPAING_SPECIAL ? CAMPAING_SPECIAL : '');
      return this.http.get(URL);
    }
   
  }


  homecursoscategory(id:any){
    let URL = URL_SERVICIOS+"courses/findtiendacategory/"+id 
    return this.http.get(URL);
  }

  getstatuspay(orden:any){
    let URL = URL_SERVICIOS+"carrito/getstsuspay/"+orden
    return this.http.post(URL,null);
  }
  homecursosuser(id:any){
    let URL = URL_SERVICIOS+"courses/findtiendauser/"+id 
    return this.http.get(URL);
  }
  searchCourse(data:any){
    let URL = URL_SERVICIOS+"courses/search-course";
    return this.http.post(URL,data);
  }



  addpagmensual(data:any){
    let URL = URL_SERVICIOS+"pagos/pagomensual";
    return this.http.post(URL,data);
  }

  getConfigAll(){
    let URL = URL_SERVICIOS+"courses/config-all";
    return this.http.get(URL);
  }

   getreview(id:any){
    let URL = URL_SERVICIOS+"reviews/getall/"+id;
    return this.http.get(URL);
  }

  
  getuser(email:any){
    let URL = URL_SERVICIOS+"users/getuser/"+email;
    return this.http.get(URL);
  }

  getinstructores( ){
    let URL = URL_SERVICIOS+"users/instructor/all";
    return this.http.get(URL);
  }
  
}
