import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { ValidarpagoComponent } from 'src/app/shared/validarpago/validarpago.component';
import { BiografiaComponent } from 'src/app/shared/biografia/biografia.component';
import { HomeService } from '../../home/service/home.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../home/service/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class productosComponent {
   user:any;
  INSTRUCTORES:any = [];
   CATEGORIES:any=[];
  CURSOS:any=[];
  CURSOSBANERS:any=[];
  DESCUENTOBANERS:any=[];
  CURSOSFLASHS:any=[];
  DESCUENTOFLASH:any=[];
  CURSOSCATEGORIS:any=[];
  REVIEWS:any=[];
constructor(
     public ToastrService : ToastrService,
    public tiendaGuestService: TiendaGuestService,
    private readonly _modalService:ModalService,
       public homeservice:HomeService, 
        public cartService: CartService,
   
   
    
  ) {
     this.user = this.cartService.authService.user;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
 
     this.homeservice.homecursoscategoridescuetoflash().subscribe((resp:any)=>{
      
console.log(resp)
      this.CURSOSFLASHS=resp.courses;
      this.DESCUENTOFLASH=resp;
      
      
     
    })
       this.homeservice.homecursoscategoridescuetobaner().subscribe((resp:any)=>{
     console.log(resp)
      this.CURSOSBANERS=resp.courses;
      this.DESCUENTOBANERS=resp;
      
      
    })
    
  }
   getpricebaner(curso:any){
     if(this.DESCUENTOBANERS.type_discount==1)
     {
            return curso.price_usd - curso.price_usd*(this.DESCUENTOBANERS.discount*0.01);
     }else{
            return curso.price_usd -  this.DESCUENTOBANERS.discount;
     }
  }


   addCart(COURSE:any,CAMPAIGN:any = null){
  if(!this.user){
    this.ToastrService .error( 'NECESITAS INGRESAR CON TU CUENTA AL SISTEMA' ,  'warning' );
    this.cartService.authService.router.navigateByUrl("auth/login");
    return;
  }
  
  if(CAMPAIGN){
    COURSE.discount_g = CAMPAIGN;
  }
  let data = {
    id_curso: COURSE.id,
    type_discount: COURSE.discount_g ? COURSE.discount_g.type_discount : null,
    discount: COURSE.discount_g ? COURSE.discount_g.discount : null,
    campaign_discount: COURSE.discount_g ? COURSE.discount_g.type_campaign : null,
    code_cupon: null,
    code_discount: COURSE.discount_g ? COURSE.discount_g.id : null,
    price_unit: COURSE.price_usd,
    subtotal: this.getTotalPriceCourse(COURSE),
    total: this.getTotalPriceCourse(COURSE),
  }

  this.cartService.registerCart(data).subscribe((resp:any) => {
     
    if(resp.statusCode == 200){
      this.ToastrService .error(  resp.message  ,   'error' );
    }else{
      this.cartService.addCart(resp);
      this.ToastrService .success( 'Agregado al carrito' ,   'Exito' );
    }
  });
}

 getNewTotal(COURSE:any,CAMPAING_BANNER:any){
  if(CAMPAING_BANNER.type_discount == 1){ //%
    return COURSE.price_usd - COURSE.price_usd*(CAMPAING_BANNER.discount*0.01);
  }else{
    return COURSE.price_usd - CAMPAING_BANNER.discount;
  }
}

getTotalPriceCourse(COURSE:any){
    if(COURSE.discount_g){
      return this.getNewTotal(COURSE,COURSE.discount_g);
    }
    return COURSE.price_usd;
  }
 openbio(url:any):void{
 
    this._modalService.show<any>(  BiografiaComponent,{title:"RESEÑA",model:{url:url},size:3}).result().subscribe((resp:any)=>{ })
   
  }

}
