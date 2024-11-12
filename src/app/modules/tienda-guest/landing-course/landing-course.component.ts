import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ActivatedRoute } from '@angular/router';

declare function HOMEINIT([]):any;
declare var $:any;
declare function magnigyPopup([]):any;
declare function showMoreBtn([]):any;
@Component({
  selector: 'app-landing-course',
  templateUrl: './landing-course.component.html',
  styleUrls: ['./landing-course.component.css']
})
export class LandingCourseComponent {

  SLUG:any = null;
  COURSE_LANDING:any = null;
  COURSE_INSTRUCTOR:any = [];
  COURSE_CATEGORIES:any = [];
  requirements:any = [];
  who_is_it_for:any = [];
  
  
  CAMPAING_SPECIAL:any = null;
  constructor(
    public TiendaGuestService: TiendaGuestService,
    public activedRouter: ActivatedRoute,
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
      this.requirements=JSON.parse(this.COURSE_LANDING.requirements)
      this.who_is_it_for=JSON.parse(this.COURSE_LANDING.who_is_it_for)
      this.TiendaGuestService.homecursoscategory(this.COURSE_LANDING.id_category_curso).subscribe((resp:any) => {
        this.COURSE_CATEGORIES = resp ;
        console.log( this.COURSE_CATEGORIES)
      })
      this.TiendaGuestService.homecursosuser(this.COURSE_LANDING.user.id).subscribe((resp:any) => {
        this.COURSE_INSTRUCTOR = resp;
        console.log( this.COURSE_INSTRUCTOR)
      })
     
     
      setTimeout(() => {
        HOMEINIT($);
        magnigyPopup($);
        showMoreBtn($);
      }, 50);
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
}
