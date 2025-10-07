import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { AlertaService } from 'src/app/modules/home/service/alerta.service';
import { CartService } from 'src/app/modules/home/service/cart.service';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

declare function cartSidenav():any;
declare function HOMEINIT([]):any;
 
 
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @ViewChild("filter") filter?:ElementRef;
  source:any;
  listCourses:any = [];
  search:any= null;
  

 
  fechaFin = new Date();   // Fecha de fin (o final)
  diasrestantes=0
  CARTS:any = [];
  SUM_TOTAL:any = 0;
  user:any=null;
 
constructor(private alertaService: AlertaService,public authservices:AuthService
  ,  public cartService: CartService,
  public tiendaGuestService: TiendaGuestService,
){
this.user=authservices.user;
  
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

//  console.log(this.user)
//console.log(this.fechaFin)
   let fechaInicio = new Date(this.user.time_limit_web); 
//  console.log(fechaInicio  )
  const diferenciaEnMilisegundos = fechaInicio.getTime()-this.fechaFin.getTime()  ;

// Calcula la diferencia en días
// 1000 milisegundos en 1 segundo
// 60 segundos en 1 minuto
// 60 minutos en 1 hora
// 24 horas en 1 día
const milisegundosPorDia = 1000 * 60 * 60 * 24;
 this.diasrestantes = diferenciaEnMilisegundos / milisegundosPorDia;

//console.log(`Los días restantes son: ${this.diasrestantes}`);

  this.cartService.resetCart();

  this.cartService.currentData$.subscribe((resp:any) => {
     
    this.CARTS = resp;
    this.SUM_TOTAL = this.CARTS.reduce((sum:number, item:any) => sum + parseFloat(item.total),0);
  })

if(this.user){
    this.cartService.listCart().subscribe((resp:any) => {
       
      resp.forEach((Cart:any) => {
        this.cartService.addCart(Cart);
      });
    })
  }
  

  setTimeout(() => {
    cartSidenav();
    HOMEINIT($)
   // this.showToast() 
   
  }, 50);
   
    
}
logout(){
 
  this.authservices.logoutweb(this.user.email).subscribe((resp:any) => {
    // this.toaste
    this.authservices.logout();
  })
  
}
removeItem(CART:any){
  this.cartService.deleteCart(CART.id).subscribe((resp:any) => {
    // this.toaste
    this.cartService.removeItemCart(CART);
  })
}

ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.source = fromEvent(this.filter?.nativeElement,"keyup");
  this.source.pipe(debounceTime(500)).subscribe((resp:any) => {
     
    let data = {
      search: this.search
    }
    if(this.search.length > 0){
      this.tiendaGuestService.searchCourse(data).subscribe((resp:any) => {
     
        this.listCourses = resp;
      })
    }
  })
}
copyMessage(text: string) {
  navigator.clipboard.writeText(text+this.user.referralCode).then().catch(e => console.log(e));
  alert("Link de referido copiado")
}

}
