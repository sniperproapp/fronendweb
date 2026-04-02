import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../home/service/cart.service';
import { ToastrService  } from 'ngx-toastr';

declare function HOMEINIT([]):any;
declare var $:any;
declare function cartSidenav():any;
 
 
 
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
    selector: 'app-landing-mensualidad',
    templateUrl: './landing-mensualidad.component.html',
    styleUrls: ['./landing-mensualidad.component.css'],
    standalone: false
})
export class LandingMensualidadComponent {
  STOK:boolean=false
  SLUG:any = null;
  PRODUCTO_LANDING:any = null;
  COURSE_INSTRUCTOR:any = [];
  COURSE_CATEGORIES:any = []; 
  REVIEWS:any = [];
  nameuser:any='';
 
  requirements:any = [];
  who_is_it_for:any = [];
  cursostuden_have_course:boolean=false
  
  user:any;
  CAMPAING_SPECIAL:any = null;
  constructor(
    public TiendaGuestService: TiendaGuestService,
    public activedRouter: ActivatedRoute,
    public cartService: CartService,
    public ToastrService : ToastrService ,public router:Router
  ) {
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.user = this.cartService.authService.user;
    this.activedRouter.params.subscribe((resp:any) => {
      
      this.SLUG = resp.slug;
    })
    this.activedRouter.queryParams.subscribe((resp:any) => {
      this.CAMPAING_SPECIAL = resp.campaing_discount;
    })
    this.TiendaGuestService.showproducto(this.SLUG,this.CAMPAING_SPECIAL).subscribe((resp:any) => {
    
      //console.log(resp)
      this.PRODUCTO_LANDING = resp;
      if(this.PRODUCTO_LANDING.inventario.cantidad_stock){
        this.STOK=true
      }
      

      this.cursostuden_have_course=this.PRODUCTO_LANDING.cursostuden_have_course
      this.requirements=JSON.parse(this.PRODUCTO_LANDING.requirements)
      this.who_is_it_for=JSON.parse(this.PRODUCTO_LANDING.who_is_it_for)
      this.TiendaGuestService.homecursoscategory(this.PRODUCTO_LANDING.id_category_curso).subscribe((resp:any) => {
        this.COURSE_CATEGORIES = resp ;
        
      })


      this.TiendaGuestService.getreview(this.PRODUCTO_LANDING.id).subscribe((resp:any) => {
        this.REVIEWS = resp ;
        
      })
      this.TiendaGuestService.homecursosuser(this.PRODUCTO_LANDING.user.id).subscribe((resp:any) => {
        this.COURSE_INSTRUCTOR = resp;
       
       
        setTimeout(() => {
          HOMEINIT($);
          magnigyPopup($);
          showMoreBtn($);
          cartSidenav();
        }, 50);
      })
     
    
     
    })
   
  }

  getNewTotal(COURSE:any,CAMPAING_BANNER:any){
    if(CAMPAING_BANNER.type_discount == 1){ //%
      return COURSE.price_usd - COURSE.price_usd*(CAMPAING_BANNER.discount*0.01);
    }else{
      return COURSE.price_usd - CAMPAING_BANNER.discount;
    }
  }
  getTotalPriceCourse(producto:any){
    
    return producto.price;
  }

  addCart(){
    //console.log(this.user)
     if(!this.user)
     {
      this.ToastrService .error(  "Registrate para pagar ",  'danger' );
          this.router.navigateByUrl("/auth/login")
     }
    let data = {
      id_user:this.user.id,
      id_producto: this.PRODUCTO_LANDING.id_producto,
      type_discount: this.PRODUCTO_LANDING.discount_g ? this.PRODUCTO_LANDING.discount_g.type_discount : null,
      discount: this.PRODUCTO_LANDING.discount_g ? this.PRODUCTO_LANDING.discount_g.discount : null,
      campaign_discount: this.PRODUCTO_LANDING.discount_g ? this.PRODUCTO_LANDING.discount_g.type_campaign : null,
      code_cupon: null,
      code_discount: this.PRODUCTO_LANDING.discount_g ? this.PRODUCTO_LANDING.discount_g.id : null,
      price_unit: this.PRODUCTO_LANDING.price,
    
      
      subtotal: this.getTotalPriceCourse(this.PRODUCTO_LANDING),
      total: this.getTotalPriceCourse(this.PRODUCTO_LANDING),
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
      
      if(resp.statusCode == 200){
        this.ToastrService .error(  resp.message, 'danger' );
      }else{
      // console.log(resp)
          this.cartService.resetCart();
        setTimeout(() => {
           
          resp.forEach((cart:any) => {
        //   console.log(cart)

            this.cartService.addCart(cart);
          });
        }, 50);

        
        this.ToastrService .success(  'GENERA EL LINK DE PAGO', 'Exito' );
        // this.router.navigateByUrl("/carrito-de-compra")landing-cursothis.router.navigateByUrl(`/ver-curso/${id}`);
      }
    });
  }

  
}
