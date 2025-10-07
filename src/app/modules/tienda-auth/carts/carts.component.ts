import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../home/service/cart.service';
import { ToastrService  } from 'ngx-toastr';
import { TiendaAuthService } from '../service/tienda-auth.service';

 
import { ModalService } from '@developer-partners/ngx-modal-dialog';
 


declare var paypal:any;

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent {

  CARTS:any = [];
  TOTAL_SUM:number = 0;
  code:any = null;
  link_pay= null;

 
  constructor(
    public cartService: CartService,
    public tiendaAuthService: TiendaAuthService,
    public ToastrService : ToastrService ,
    private readonly _modalService:ModalService
  ) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.currentData$.subscribe((resp:any) => {
     // console.log(this.CARTS)
      this.CARTS = resp;
      this.TOTAL_SUM = this.CARTS.reduce((sum:number,item:any) => sum + parseFloat(item.total),0);
    })

    

    
  }


generarorden(){
  let dataOrder = {
    method_payment: "usdt",
    currency_total: "USD",
    currency_payment: "USD",
    total: this.TOTAL_SUM,
    n_transaccion:  "",
    
  };
  this.tiendaAuthService.registerOrder(dataOrder).subscribe((resp:any) => {
    // console.log(resp)
    if(resp.statusCode==200){
      this.link_pay=resp.message
      this.ToastrService .success( resp.message,  'primary');
      this.cartService.resetCart();
    }else{
      this.ToastrService .success( resp.message,  'warning');
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
      this.ToastrService .success( 'DEBES INGRESAR UN CODIGO DE CUPON',  'danger');
      return ;
    }
    let data = {
      cupon: this.code,
    }
    this.cartService.applyCupon(data).subscribe((resp:any) => {
    
      if(resp.statusCode == 200){
        this.ToastrService .success( resp.message,  'danger');
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
