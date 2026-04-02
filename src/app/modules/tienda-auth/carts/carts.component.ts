import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CartService } from '../../home/service/cart.service';
import { ToastrService  } from 'ngx-toastr';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
 
 import { HttpClient } from '@angular/common/http';
import { HostListener } from '@angular/core';
 
 


 

 

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
export class CartsComponent implements AfterViewInit {
  
@ViewChild('wompiContainer', { static: false }) wompiContainer!: ElementRef;
  CARTS:any = [];
  adress:string=''
  telefono:string=''
  n_cantidad:number=1
  sumatotal = 0;
  code:any = null;
  link_pay= null;
  yesadress: boolean=false;


  @HostListener('window:message', ['$event'])
onWompiEvent(event: MessageEvent) {
  
  // 1. Validar que el mensaje viene de Wompi (seguridad)
  if (!event.origin.includes('wompi.co')) return;

  const { data } = event;
 
  // 2. Detectar cuando la transacción finaliza
  if (data && data.event === 'finishpayment') {
    const transaction = data.data.transaction;
     this.tiendaAuthService.resetearcarOrderwompi(data).subscribe((resp:any) => {
   // console.log(resp)
    if(resp.statusCode==200){
     
      this.ToastrService .success( resp.message,  'Exito');
      this.cartService.resetCart();
    }else{
      this.ToastrService .error( resp.message,  'warning');
    }
  })
     
    }
 console.log(data);

  // 3. Opcional: Saber si el usuario simplemente cerró el modal sin pagar
  if (data && data.event === 'escpressed') {
    console.log('El usuario cerró el widget de Wompi');
  }
}

 
 
  constructor(
    public cartService: CartService,
    public tiendaAuthService: TiendaAuthService,
    public ToastrService : ToastrService ,
    private http: HttpClient,
    private renderer: Renderer2
  ) {
    
  }
 ngAfterViewInit() {
  // Usamos un pequeño timeout para dar tiempo a que el DOM se asiente
  setTimeout(() => {
    this.renderWompiButton();
  }, 300);
}

private async renderWompiButton() {
   let  referencia =`USER${Date.now()}`;
   let amount =(this.sumatotal*3700)*100
    // Verificación de seguridad crítica
 let   data={
       "reference" : referencia,
        "amount" : amount
    }
 this.tiendaAuthService.getsignature(data).subscribe((resp:any) => {
   if (!this.wompiContainer || !this.wompiContainer.nativeElement) {
    console.error("No se encontró el contenedor #wompiContainer en el DOM.");
    return;
  }
 /// cargar el boton de wompi 
  const script = this.renderer.createElement('script');
  this.renderer.setAttribute(script, 'src', 'https://checkout.wompi.co/widget.js');
  this.renderer.setAttribute(script, 'data-render', 'button');
  this.renderer.setAttribute(script, 'data-public-key', 'pub_test_P2dSfWUjoLXYLRTscoTd3aHldTm34rIS');
  this.renderer.setAttribute(script, 'data-currency', 'COP');
  this.renderer.setAttribute(script, 'data-amount-in-cents', amount.toString());
  this.renderer.setAttribute(script, 'data-reference', referencia); // Debería ser dinámica
  this.renderer.setAttribute(script, 'data-signature:integrity', resp.signature);

  this.renderer.appendChild(this.wompiContainer.nativeElement, script);
  this.renderer.listen(this.wompiContainer.nativeElement, 'click', (event) => {
  // Verificamos si lo que se clickeó es el botón de Wompi
  // El widget de Wompi suele generar un botón o un elemento con una clase específica
  if (event.target.closest('button') || event.target.closest('.wompi-button')) {
    
    console.log("¡El usuario hizo clic en el botón de pago!");
    
 let dataOrder = {
    method_payment: "usdt",
    currency_total: "USD",
    currency_payment: "USD",
    productos:this.CARTS,
    total: this.sumatotal,
    adress:this.adress,
    telefono:this.telefono,
    n_transaccion:  referencia,
    id_clase:this.CARTS.id_clase
    
  };


   this.tiendaAuthService.registerOrderwompi(dataOrder).subscribe((resp:any) => {
   // console.log(resp)
    if(resp.statusCode==200){
    
      this.ToastrService .success( resp.message,  'Exito');
      
    }else{
      this.ToastrService .error( resp.message,  'warning');
    }
  })

    // Aquí ejecutas tu función personalizada
    //this.miFuncionAlDarClick();
  }
});
  });
 


}








  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.currentData$.subscribe((resp:any) => {
     console.log(resp)
    this.CARTS = resp;
    if(this.CARTS)
    {
      let i=0;
this.CARTS.forEach((cart:any) => {
            if(cart.productos.tipo_articulo=="Fisico")
            {
              this.yesadress=true
              this.CARTS[i].n_cantidad=1
              

            }

            i++;
          });

    }
    // console.log(resp)
    this.sumatotal = this.CARTS.reduce((sum:number,item:any) => sum + parseFloat(item.total),0);
    
   

    })

    

    
  }







 
populate(){
       let i=0;
this.CARTS.forEach((cart:any) => {
            if(cart.productos.tipo_articulo=="Fisico")
            { 
              this.CARTS[i].total= this.CARTS[i].n_cantidad*this.CARTS[i].price_unit

            }

            i++;
          });
 this.sumatotal = this.CARTS.reduce((sum:number,item:any) => sum + parseFloat(item.total),0);
}
generarorden(){
  if(this.yesadress){
    if(this.adress==''){
       this.ToastrService .error  ( "Debe agregar la direccion de envio para poder generar el link de pago ",  'warning');
       return
    }
    if(this.telefono==''){
       this.ToastrService .error  ( "Debe agregar el telefono para poder generar el link de pago ",  'warning');
       return
    }
  }
  let dataOrder = {
    method_payment: "usdt",
    currency_total: "USD",
    currency_payment: "USD",
    productos:this.CARTS,
    total: this.sumatotal,
    adress:this.adress,
    telefono:this.telefono,
    n_transaccion:  "",
    id_clase:this.CARTS.id_clase
    
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
      //console.log(CART)
      if(CART.productos.tipo_articulo=="Fisico")
      {
        this.yesadress=false
      }
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
