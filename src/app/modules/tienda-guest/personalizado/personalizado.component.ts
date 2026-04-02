import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../home/service/cart.service';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ToastrService  } from 'ngx-toastr';
declare function HOMEINIT([]):any;
declare var $:any;
declare function cartSidenav():any;
 
 
 
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
  selector: 'app-personalizado', 
  templateUrl: './personalizado.component.html',
  styleUrl: './personalizado.component.css',
  
    standalone: false
})



export class PersonalizadoComponent {


  

SLUG:any = null;

  COURSE_LANDING:any = null;
  COURSE_INSTRUCTOR:any = [];
  COURSE_CATEGORIES:any = []; 
  REVIEWS:any = [];
  CLASES:any = [];
  clasespagadas: number[] = [];
  requirements:any = [];
  who_is_it_for:any = [];
  cursostuden_have_course:boolean=false
  
  user:any;
  CAMPAING_SPECIAL:any = null;
  constructor(
    public TiendaGuestService: TiendaGuestService,
    public activedRouter: ActivatedRoute,
    public cartService: CartService,
    public ToastrService : ToastrService 
    ,public router:Router
 
  ) {
     this.user = this.cartService.authService.user;
  }

    ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.activedRouter.params.subscribe((resp:any) => {
        this.SLUG = resp.slug;
       
      })
      this.activedRouter.queryParams.subscribe((resp:any) => {
        this.CAMPAING_SPECIAL = resp.campaing_discount;
      })

       this.TiendaGuestService.personalizadoclases(this.user.id).subscribe((resp1:any) => {
      

        resp1.forEach((clase:any) => {
        //   console.log(cart)
          this.clasespagadas.push(clase.id_clase)
            
          });
           console.log("clases")
       console.log(this.clasespagadas)

       })
 
       
      this.TiendaGuestService.showCourse(65,this.CAMPAING_SPECIAL).subscribe((resp:any) => {
         
        this.COURSE_LANDING = resp;
        console.log(resp)
        this.cursostuden_have_course=this.COURSE_LANDING.cursostuden_have_course
        this.requirements=JSON.parse(this.COURSE_LANDING.requirements)
        this.who_is_it_for=JSON.parse(this.COURSE_LANDING.who_is_it_for)
        this.TiendaGuestService.homecursoscategory(this.COURSE_LANDING.id_category_curso).subscribe((resp:any) => {
          this.COURSE_CATEGORIES = resp ;
           
           
        })
  
  
        this.TiendaGuestService.getreview(this.COURSE_LANDING.id).subscribe((resp:any) => {
          this.REVIEWS = resp ;
          
        })
        this.TiendaGuestService.homecursosuser(this.COURSE_LANDING.user.id).subscribe((resp:any) => {
          this.COURSE_INSTRUCTOR = resp;
          
         
          setTimeout(() => {
            HOMEINIT($);
            magnigyPopup($);
            showMoreBtn($);
            cartSidenav();
          }, 50);
        })
       
        this.user = this.cartService.authService.user;
       
      })

    
     
    }

     subirscroll(){
    window.scrollTo(0, 0);
  }


 addCart(clase:any,price:number){
    //console.log(this.user)
     if(!this.user)
     {
      this.ToastrService .error(  "Registrate para pagar ",  'danger' );
          this.router.navigateByUrl("/auth/login")
     }
    let data = {
      id_user:this.user.id,
      id_producto: 22 ,
      type_discount: null ,
      id_clase: clase.id ,
      name_clase: clase.title ,
      discount: null ,
      campaign_discount: null ,
      code_cupon: null,
      code_discount:  null,
      price_unit: price,
    
      
      subtotal:  price,
      total:price  ,
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


  addCartall(id:any,price:number){
    //console.log(this.user)
     if(!this.user)
     {
      this.ToastrService .error(  "Registrate para pagar ",  'danger' );
          this.router.navigateByUrl("/auth/login")
     }
    let data = {
      id_user:this.user.id,
      id_producto: 22 ,
      type_discount: null ,
      id_transaccion: id ,
      discount: null ,
      campaign_discount: null ,
      code_cupon: null,
      code_discount:  null,
      price_unit: price,
      id_curso:id,
      
      subtotal:  price,
      total:price  ,
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

calcularpreciototal(){

 
  let preciounitario=  this.COURSE_LANDING.price_usd/this.COURSE_LANDING.num_clases

  let numerodeclasespagadas=this.clasespagadas.length
return this.COURSE_LANDING.price_usd-(numerodeclasespagadas*preciounitario)

}

  addclases(id:number){
    if(!this.user){
    this.ToastrService .error( 'NECESITAS INGRESAR CON TU CUENTA AL SISTEMA' ,  'warning' );
    this.cartService.authService.router.navigateByUrl("auth/login");
    return;
  }
  }
}
