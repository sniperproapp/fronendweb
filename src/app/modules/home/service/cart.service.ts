import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/service/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = new BehaviorSubject<Array<any>>([]);
  public currentData$ = this.cart.asObservable();

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  addCart(DATA:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.id_curso == DATA.id_curso);
    if(Index == -1){
      listCart.unshift(DATA);
    }
    this.cart.next(listCart);
    
  }

  resetCart(){
    this.cart.next([]);
  }

  removeItemCart(DATA:any){
    let listCart = this.cart.getValue();
    let Index = listCart.findIndex(item => item.id_curso == DATA.id_curso);
    if(Index != -1){
      listCart.splice(Index,1);
    }
    this.cart.next(listCart);
  }

  // SE VAN A DEFINIR LOS ENDPOINTS DEL BACKEND
  listCart(){
    
    let headers = new HttpHeaders({"Authorization": this.authService.token});
    let URL = URL_SERVICIOS+"carrito";
    return this.http.get(URL,{headers: headers});
  }
  registerCart(data:any){

    let headers = new HttpHeaders({"Authorization": this.authService.token});
    
    let URL = URL_SERVICIOS+"carrito/register";
    return this.http.post(URL,data,{headers: headers});
  }
  
  inscribir(id:any){
    let headers = new HttpHeaders({"Authorization": this.authService.token});
   
    let URL = URL_SERVICIOS+"sale/inscribir/"+id;
    return this.http.post(URL ,{} ,{headers: headers});
  }

  registerCartmensualidad(data:any){
     
    let URL = URL_SERVICIOS+"carrito/registermensualidad";
    return this.http.post(URL,data);
  }
  deleteCart(cart_id:any){
    let headers = new HttpHeaders({"Authorization": this.authService.token});
    let URL = URL_SERVICIOS+"carrito/remove/"+cart_id;
    return this.http.delete(URL,{headers: headers});
  }
  applyCupon(data:any){
    let headers = new HttpHeaders({"Authorization": this.authService.token});
    let URL = URL_SERVICIOS+"carrito/update/"+data.cupon;
    return this.http.post(URL,data,{headers: headers});
  }
}
