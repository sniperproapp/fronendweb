import { Component } from '@angular/core';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';
//import { YouTubePlayer } from '@angular/youtube-player';
import { AuthService } from '../../auth/service/auth.service';
import { CartService } from '../../home/service/cart.service';
 
 

 
 
declare function HOMEINIT([]):any;
declare var $:any;
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
    selector: 'app-course-leason',
    templateUrl: './course-leason.component.html',
    styleUrls: ['./course-leason.component.css'],
    standalone: false
})
export class CourseLeasonComponent {

 url:any
   
valor=0;
  slug_course:any;
  COURSE_SELECTED:any;
  CLASE_SELECTED:any;
  CLASE_SELECTED_titulo:any;
  COURSE_STUDENT:any;
  requirements:any = [];
  clases_checked:any = [];
  user:any=null;
  who_is_it_fors:any = [];

  CLASES_SELECTEDS:any = [];
  constructor( public authservices:AuthService,
    public tiendaAuth: TiendaAuthService,
    public activedRouter: ActivatedRoute,
    public router: Router,
    public ToastrService : ToastrService ,
    public Sanitizer: DomSanitizer,
     public cartService: CartService,
  ) {
     this.user=authservices.user;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRouter.params.subscribe((resp:any) => {
      this.slug_course = resp.slug;
     
    })
    this.tiendaAuth.courseLeason(this.slug_course).subscribe((resp:any) => {
           
   // console.log(resp)
      if(resp.statusCode == 200){
            alert( resp.message)
             this.addCart()
           
          
      }else{
        this.COURSE_SELECTED = resp;
      // console.log(this.COURSE_SELECTED)
        this.requirements=JSON.parse(this.COURSE_SELECTED.requirements)
        this.who_is_it_fors=JSON.parse(this.COURSE_SELECTED.who_is_it_for)
       
        
        this.CLASE_SELECTED = this.COURSE_SELECTED.seciones[0].clases[0];
        this.url= this.Sanitizer.bypassSecurityTrustResourceUrl( this.CLASE_SELECTED.vimeo_id); 
        this.CLASE_SELECTED_titulo = this.COURSE_SELECTED.seciones[0].clases[0].title;
        this.COURSE_STUDENT = resp.coursestudent;
        
    // this. clases_checked =JSON.parse(this.COURSE_STUDENT.clases_checked)
       
        
         this.CLASES_SELECTEDS = this.COURSE_STUDENT.clases_checked?this.COURSE_STUDENT.clases_checked:[];
         if(!this.COURSE_STUDENT.clases_checked){
         this.COURSE_STUDENT.clases_checked=[]}
        
      }

       
      setTimeout(() => {
        HOMEINIT($);
        magnigyPopup($);
        showMoreBtn($);
      }, 50);
    })
  }

  selectedClase(CLASE:any,titulo:any){
    this.CLASE_SELECTED = CLASE;
    this.url= this.Sanitizer.bypassSecurityTrustResourceUrl( this.CLASE_SELECTED.vimeo_id); 
    this.CLASE_SELECTED_titulo = titulo;

    window.scrollTo(0, 0);
  }
  checkedClase(CLASE:any){

    let INDEX = this.CLASES_SELECTEDS.findIndex((item:any) => item == CLASE.id );
    if(INDEX != -1){
      this.CLASES_SELECTEDS.splice(INDEX,1);
    }else{
      this.CLASES_SELECTEDS.push(CLASE.id);
    }
    // LA SOLICITUD AL BACKEND PARA GUARDAR LA INFORMACIÓN
    let data = {
      id: this.COURSE_STUDENT.id,
      clases_checked: this.CLASES_SELECTEDS,
      state: this.CLASES_SELECTEDS.length == this.COURSE_SELECTED.num_clases ? 2 : 1,
    }
    this.tiendaAuth.updateClase(data).subscribe((resp:any) => {
      
    })
  }
  urlVideo(){
   
    
    
    
  }


   addCart(){
    console.log(this.user)
    if(this.user.estadomensualidad==1){

      let data = {
      id_user:this.user.id,
      id_curso: 59,
      discount:   null,
    
      campaign_discount:   null,
      code_cupon: null,
      code_discount:   null,
      price_unit:50,
    
       subtotal:50,
      total:50
    
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
     // console.log(resp)
      if(resp.statusCode == 200){
        this.ToastrService .error( resp.message,  'danger' );
      }else{
        this.cartService.addCart(resp);
        this.ToastrService .success( 'Genera el link de pago',   'Exito' );
         this.router.navigateByUrl("/carrito-de-compra")
      }
      
    
    });

    }
    if(this.user.estadomensualidad==0){

 let data = {
      id_user:this.user.id,
      id_curso: 15,
      discount:   null,
    
      campaign_discount:   null,
      code_cupon: null,
      code_discount:   null,
      price_unit:499,
    
       subtotal:499,
      total:499
    
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
     // console.log(resp)
      if(resp.statusCode == 200){
        this.ToastrService .error( resp.message,  'danger' );
      }else{
        this.cartService.addCart(resp);
        this.ToastrService .success( 'Genera el link de pago',   'Exito' );
         this.router.navigateByUrl("/carrito-de-compra")
      }
      
    
    });

    }
     
    
  }

  
}
