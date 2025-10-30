import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TiendaAuthService {

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) { }

  registerOrder(data:any){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"sale";
    return this.http.post(URL,data,{headers: headers});
  }
  profileStudent(){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"auth/informacionuser";
    return this.http.get(URL,{headers: headers});
  }

  getbalace(){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"referral/comisionesall";
    return this.http.get(URL,{headers: headers});
  }

   getallsales(){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"auth/getallreferral";
    return this.http.get(URL,{headers: headers});
  }


  updateStudentwihtimagen(id:string,formData:any){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"users/update/"+id;
    return this.http.put(URL,formData,{headers: headers});
  }

  updateStudent(id:string,formData:any){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"users/"+id;
    return this.http.put(URL,formData,{headers: headers});
  }



   createpay(id:number){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"valid_pay/create/"+id;
    return this.http.post(URL, {headers: headers});
  }


  updateStudentpass(formData:any){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"auth/updatepass"
    return this.http.post(URL,formData,{headers: headers});
  }

  registerReview(formData:any){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"reviews/review-register";
    return this.http.post(URL,formData,{headers: headers});
  }

  updateReview(formData:any){
    let headers = new HttpHeaders({'Authorization'  : this.authService.token});
    let URL = URL_SERVICIOS+"reviews/update";
    return this.http.post(URL,formData,{headers: headers});
  }
  courseLeason(slug:string){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"courses/vercurso/"+slug;
    return this.http.get(URL,{headers: headers});
  }


   codigo2af(){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"pagos/2af/";
    return this.http.get(URL,{headers: headers});
  }

  updateClase(formData:any){
    let headers = new HttpHeaders({'Authorization': this.authService.token});
    let URL = URL_SERVICIOS+"courses/updatecheck";
    return this.http.post(URL,formData,{headers: headers});
  }
}
