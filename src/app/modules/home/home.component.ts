import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { HomeService } from './service/home.service';
import { CartService } from './service/cart.service';
declare function HOMEINIT([]):any;
declare function countdownT(): any
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
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
  constructor(private toaster: Toaster,
    public homeservice:HomeService,
    public cartService: CartService,
  ){
    
  }
  showToast() {
    this.toaster.open('Hello world!');
  }
  ngOnInit(): void{

    this.user = this.cartService.authService.user;
    this.homeservice.homecursoscategoridescuetoflash().subscribe((resp:any)=>{
      console.log(resp )

      this.CURSOSFLASHS=resp.courses;
      this.DESCUENTOFLASH=resp;
      
      console.log("this.DESCUENTOFLASH")
      console.log(this.DESCUENTOFLASH)
      setTimeout(() => {
      
        HOMEINIT($)
       // this.showToast() 
        countdownT()
      }, 50);  
    })




    this.homeservice.homecursoscategoridescuetobaner().subscribe((resp:any)=>{

      this.CURSOSBANERS=resp.courses;
      this.DESCUENTOBANERS=resp;
      
      console.log(this.DESCUENTOBANERS)
    })


    
    this.homeservice.homereviews().subscribe((resp:any)=>{

      this.REVIEWS=resp;
      
      
      console.log(this.REVIEWS)
    })

    this.homeservice.homecursoscategori().subscribe((resp:any)=>{

      this.CURSOSCATEGORIS=resp;
      console.log(this.CURSOSCATEGORIS)
    })
    this.homeservice.homecategoria('allcategorie').subscribe((resp:any)=>{

      this.CATEGORIES=resp;
      console.log(this.CATEGORIES)
    })
    // this.homeservice.homecursos('allcatego').subscribe((resp:any)=>{

    //   this.CURSOS=resp;
    //   console.log("this.CURSOS")
    //   console.log(this.CURSOS)
    //   console.log("this.CURSOS")
    

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
    this.toaster.open({text: 'NECESITAS INGRESAR CON TU CUENTA AL SISTEMA',caption: 'VALIDACIÓN',type: 'warning'});
    this.cartService.authService.router.navigateByUrl("auth/login");
    return;
  }
  console.log(COURSE)
  console.log(CAMPAIGN)
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
    console.log(resp);
    if(resp.statusCode == 200){
      this.toaster.open({text: resp.message  ,caption: 'VALIDACIÓN',type: 'danger'});
    }else{
      this.cartService.addCart(resp);
      this.toaster.open({text:'Agregado al carrito',caption: 'VALIDACIÓN',type: 'primary'});
    }
  });
}
}
