import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../home/service/cart.service';
import { Toaster } from 'ngx-toast-notifications';

declare function HOMEINIT([]):any;
declare var $:any;
declare function cartSidenav():any;
 
 
 
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
  selector: 'app-landing-mensualidad',
  templateUrl: './landing-mensualidad.component.html',
  styleUrls: ['./landing-mensualidad.component.css']
})
export class LandingMensualidadComponent {

  SLUG:any = null;
  COURSE_LANDING:any = null;
  COURSE_INSTRUCTOR:any = [];
  COURSE_CATEGORIES:any = []; 
  REVIEWS:any = [];
  nameuser:any='';
  nameuserencontrado:any=null;
  requirements:any = [];
  who_is_it_for:any = [];
  cursostuden_have_course:boolean=false
  
  user:any;
  CAMPAING_SPECIAL:any = null;
  constructor(
    public TiendaGuestService: TiendaGuestService,
    public activedRouter: ActivatedRoute,
    public cartService: CartService,
    public toaster: Toaster,
  ) {
    
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
    this.TiendaGuestService.showCourse(this.SLUG,this.CAMPAING_SPECIAL).subscribe((resp:any) => {
      console.log(resp);
      this.COURSE_LANDING = resp;
      this.cursostuden_have_course=this.COURSE_LANDING.cursostuden_have_course
      this.requirements=JSON.parse(this.COURSE_LANDING.requirements)
      this.who_is_it_for=JSON.parse(this.COURSE_LANDING.who_is_it_for)
      this.TiendaGuestService.homecursoscategory(this.COURSE_LANDING.id_category_curso).subscribe((resp:any) => {
        this.COURSE_CATEGORIES = resp ;
        console.log( this.COURSE_CATEGORIES)
      })


      this.TiendaGuestService.getreview(this.COURSE_LANDING.id).subscribe((resp:any) => {
        this.REVIEWS = resp ;
        console.log( this.REVIEWS)
      })
      this.TiendaGuestService.homecursosuser(this.COURSE_LANDING.user.id).subscribe((resp:any) => {
        this.COURSE_INSTRUCTOR = resp;
        console.log( this.COURSE_INSTRUCTOR)
       
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

  addCart(){
    
    let data = {
      id_user:this.nameuserencontrado.id,
      id_curso: this.COURSE_LANDING.id,
      type_discount: this.COURSE_LANDING.discount_g ? this.COURSE_LANDING.discount_g.type_discount : null,
      discount: this.COURSE_LANDING.discount_g ? this.COURSE_LANDING.discount_g.discount : null,
      campaign_discount: this.COURSE_LANDING.discount_g ? this.COURSE_LANDING.discount_g.type_campaign : null,
      code_cupon: null,
      code_discount: this.COURSE_LANDING.discount_g ? this.COURSE_LANDING.discount_g.id : null,
      price_unit: this.COURSE_LANDING.price_usd,
    
      
      subtotal: this.getTotalPriceCourse(this.COURSE_LANDING),
      total: this.getTotalPriceCourse(this.COURSE_LANDING),
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
      console.log(resp);
      if(resp.statusCode == 200){
        this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.cartService.addCart(resp);
        this.toaster.open({text: 'agregado al carrito',caption: 'VALIDACIÓN',type: 'primary'});
      }
    });
  }

  buscaruser(){
   
     

    this.TiendaGuestService.getuser(this.nameuser).subscribe((resp:any) => {
    
        this.nameuserencontrado=resp
       if(resp.statusCode == 200){
          this.toaster.open({text: "Usuario no Encontrado",caption: 'VALIDACIÓN',type: 'danger'});
       }else{
          
          this.toaster.open({text: 'Usuario Encontrado',caption: 'VALIDACIÓN',type: 'primary'});
        }
      });
  }
}
