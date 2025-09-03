import { Component } from '@angular/core';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { YouTubePlayer } from '@angular/youtube-player';
 
 

 
 
declare function HOMEINIT([]):any;
declare var $:any;
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
  
 
  selector: 'app-course-leason',
  templateUrl: './course-leason.component.html',
  styleUrls: ['./course-leason.component.css'],
  
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
  
  who_is_it_fors:any = [];

  CLASES_SELECTEDS:any = [];
  constructor( 
    public tiendaAuth: TiendaAuthService,
    public activedRouter: ActivatedRoute,
    public router: Router,
    public toaster: Toaster,
    public Sanitizer: DomSanitizer,
  ) {
     
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRouter.params.subscribe((resp:any) => {
      this.slug_course = resp.slug;
    })
    this.tiendaAuth.courseLeason(this.slug_course).subscribe((resp:any) => {
      

      if(resp.statusCode == 200){
        this.toaster.open({text: resp.message_text, caption: 'VALIDACION',type: 'warning'});
        this.router.navigateByUrl("/");
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

  
}
