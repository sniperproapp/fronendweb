import { Component } from '@angular/core';
 
import { HomeService } from './service/home.service';
import { CartService } from './service/cart.service';
import { ReferralService } from './service/referral.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare function HOMEINIT([]):any;
declare function countdownT(): any
declare var $:any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
  user:any;
  CATEGORIES:any=[];
  CURSOS:any=[];
  CURSOSBANERS:any=[];
  DESCUENTOBANERS:any=[];
  CURSOSFLASHS:any=[];
  DESCUENTOFLASH:any=[];
  CURSOSCATEGORIS:any=[];
  REVIEWS:any=[];
  constructor(public ToastrService : ToastrService,
    public homeservice:HomeService,
    public cartService: CartService,
    public referralService: ReferralService,private route: ActivatedRoute,
  ){
    this.user = this.cartService.authService.user;
  }
  
  ngOnInit(): void{
    //console.log('this.user')
    //console.log(this.user)
     this.route.queryParams.subscribe(params => {
      const referralId = params['ref'];
      this.referralService.saveReferralId(referralId);
    
    });
    
    this.homeservice.homecursoscategoridescuetoflash().subscribe((resp:any)=>{
      

      this.CURSOSFLASHS=resp.courses;
      this.DESCUENTOFLASH=resp;
      
      
      setTimeout(() => {
      
        HOMEINIT($)
       // this.showToast() 
        countdownT()
      }, 50);  
    })




    this.homeservice.homecursoscategoridescuetobaner().subscribe((resp:any)=>{
   //  console.log(resp)
      this.CURSOSBANERS=resp.courses;
      this.DESCUENTOBANERS=resp;
      
      
    })


    
    this.homeservice.homereviews().subscribe((resp:any)=>{

      this.REVIEWS=resp;
      
      
      
    })

    this.homeservice.homecursoscategori().subscribe((resp:any)=>{

      this.CURSOSCATEGORIS=resp;
     
    })
    this.homeservice.homecategoria('allcategorie').subscribe((resp:any)=>{

      this.CATEGORIES=resp;
      
    })
    // this.homeservice.homecursos('allcatego').subscribe((resp:any)=>{

    //   this.CURSOS=resp;
     
    

    // })
   
  }

  getpricebaner(curso:any){
     if(this.DESCUENTOBANERS.type_discount==1)
     {
            return curso.price_usd - curso.price_usd*(this.DESCUENTOBANERS.discount*0.01);
     }else{
            return curso.price_usd -  this.DESCUENTOBANERS.discount;
     }
  }

  getpriceflash(curso:any){
    if(this.DESCUENTOFLASH.type_discount==1)
    {
           return curso.price_usd - curso.price_usd*(this.DESCUENTOFLASH.discount*0.01);
    }else{
           return curso.price_usd -  this.DESCUENTOFLASH.discount;
    }


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
}
