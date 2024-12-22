import { Component, ElementRef, ViewChild } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
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
  
  CARTS:any = [];
  SUM_TOTAL:any = 0;
  user:any=null;
constructor(public authservices:AuthService
  ,  public cartService: CartService,
  public tiendaGuestService: TiendaGuestService,
){
this.user=authservices.user;
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

  this.cartService.resetCart();

  this.cartService.currentData$.subscribe((resp:any) => {
    console.log(resp);
    this.CARTS = resp;
    this.SUM_TOTAL = this.CARTS.reduce((sum:number, item:any) => sum + parseFloat(item.total),0);
  })

  if(this.user){
    this.cartService.listCart().subscribe((resp:any) => {
      console.log(resp);
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
logout(){this.authservices.logout();}
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
    console.log(resp);
    let data = {
      search: this.search
    }
    if(this.search.length > 0){
      this.tiendaGuestService.searchCourse(data).subscribe((resp:any) => {
        console.log(resp);
        this.listCourses = resp;
      })
    }
  })
}

}
