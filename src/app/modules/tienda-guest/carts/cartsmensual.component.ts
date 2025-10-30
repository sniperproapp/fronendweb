import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../home/service/cart.service';
import { ToastrService  } from 'ngx-toastr';
 
 
 
import { TiendaGuestService } from '../service/tienda-guest.service';

 


declare var paypal:any;

@Component({
  selector: 'app-carts-mensual',
  templateUrl: './cartsmensual.component.html',
  styleUrls: ['./cartsmensual.component.css']
})
export class CartsMensualComponent {

  CARTS:any = [];
  TOTAL_SUM:number = 0;
  code:any = null;

 
  constructor(
    public cartService: CartService,
    public tiendaGuestService: TiendaGuestService,
    public ToastrService : ToastrService ,
    
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.currentData$.subscribe((resp:any) => {
   //  console.log(this.CARTS)
      this.CARTS = resp;
      this.TOTAL_SUM = this.CARTS.reduce((sum:number,item:any) => sum + parseFloat(item.total),0);
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
