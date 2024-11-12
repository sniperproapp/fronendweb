import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { HomeService } from './service/home.service';
declare function HOMEINIT([]):any;
declare function countdownT(): any
declare var $:any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  CATEGORIES:any=[];
  CURSOS:any=[];
  CURSOSBANERS:any=[];
  DESCUENTOBANERS:any=[];
  CURSOSFLASHS:any=[];
  DESCUENTOFLASH:any=[];
  CURSOSCATEGORIS:any=[];
  constructor(private toaster: Toaster,
    public homeservice:HomeService
  ){
    
  }
  showToast() {
    this.toaster.open('Hello world!');
  }
  ngOnInit(): void{

    
    this.homeservice.homecursoscategoridescuetoflash().subscribe((resp:any)=>{

      this.CURSOSFLASHS=resp.courses;
      this.DESCUENTOFLASH=resp;
      
      console.log("this.DESCUENTOFLASH")
      console.log(this.DESCUENTOFLASH)
      setTimeout(() => {
      
        HOMEINIT($)
        this.showToast() 
        countdownT()
      }, 50);  
    })




    this.homeservice.homecursoscategoridescuetobaner().subscribe((resp:any)=>{

      this.CURSOSBANERS=resp.courses;
      this.DESCUENTOBANERS=resp;
      
      console.log(this.DESCUENTOBANERS)
    })

    this.homeservice.homecursoscategori().subscribe((resp:any)=>{

      this.CURSOSCATEGORIS=resp;
      console.log(this.CURSOSCATEGORIS)
    })
    this.homeservice.homecategoria('allcategorie').subscribe((resp:any)=>{

      this.CATEGORIES=resp;
      console.log(this.CATEGORIES)
    })
    this.homeservice.homecursos('allcatego').subscribe((resp:any)=>{

      this.CURSOS=resp;
      console.log(this.CURSOS)
    

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

  getpriceflash(curso:any){
    if(this.DESCUENTOFLASH.type_discount==1)
    {
           return curso.price_usd - curso.price_usd*(this.DESCUENTOFLASH.discount*0.01);
    }else{
           return curso.price_usd -  this.DESCUENTOFLASH.discount;
    }
 }
}
