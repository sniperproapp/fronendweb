import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../home/service/cart.service';
import { ToastrService  } from 'ngx-toastr';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
 
 
 




declare var paypal:any;

@Component({
  standalone:true,
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
  imports: [
    CommonModule, // ¡AÑADIDO! Contiene *ngIf, *ngFor, ngClass, ngStyle, etc.
 FormsModule
  ],

})
export class CartsComponent {

  CARTS:any = [];
  sumatotal = 0;
  code:any = null;
  link_pay= null;

 
  constructor(
    public cartService: CartService,
    public tiendaAuthService: TiendaAuthService,
    public ToastrService : ToastrService ,
    
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.currentData$.subscribe((resp:any) => {
     
      this.CARTS = resp;
   //   console.log(this.CARTS)
      this.sumatotal = this.CARTS.reduce((sum:number,item:any) => sum + parseFloat(item.total),0);
    //  console.log(this.sumatotal)

    })

    

    
  }


generarorden(){
  let dataOrder = {
    method_payment: "usdt",
    currency_total: "USD",
    currency_payment: "USD",
    id_curso:this.CARTS[0].id_curso,
    total: this.sumatotal,
    n_transaccion:  "",
    
  };
  if(dataOrder.total==0  ){
     this.ToastrService .error  ( "Al menos debes tener un paquete seleccionado",  'warning');
     return
  }
  if(this.link_pay){
     this.ToastrService .error  ( "Ya él link fue generado puedes verlo debajo del botón de pago o en tu correo",  'warning');
     return
  }
  this.tiendaAuthService.registerOrder(dataOrder).subscribe((resp:any) => {
   // console.log(resp)
    if(resp.statusCode==200){
      this.link_pay=resp.message
      this.ToastrService .success( resp.message,  'Exito');
      this.cartService.resetCart();
    }else{
      this.ToastrService .error( resp.message,  'warning');
    }
  })
}
 
  getNameCampaign(campaign_discount:number){
    let NAME = "";
    if(campaign_discount == 1){
      NAME = "CAMPAÑA DE DESCUENTO NORMAL";
    }
    if(campaign_discount == 2){
      NAME = "CAMPAÑA DE DESCUENTO FLASH";
    }
    if(campaign_discount == 3){
      NAME = "CAMPAÑA DE DESCUENTO BANNER";
    }
    return NAME;
  }
  removeItem(CART:any){
    this.cartService.deleteCart(CART.id).subscribe((resp:any) => {
      this.cartService.removeItemCart(CART);
    })
  }

  applyCupon(){
    if(!this.code){
      this.ToastrService .error( 'DEBES INGRESAR UN CODIGO DE CUPON',  'danger');
      return ;
    }
    let data = {
      cupon: this.code,
    }
    this.cartService.applyCupon(data).subscribe((resp:any) => {
    
      if(resp.statusCode == 200){
        this.ToastrService .error( resp.message,  'danger');
      }else{
        
        this.cartService.resetCart();
        setTimeout(() => {
          this.code = null;
          resp.forEach((cart:any) => {
            this.cartService.addCart(cart);
          });
        }, 50);
        this.ToastrService .success( 'cupon aplicado correctamente ',  'success');
      }
    })
  }
}
