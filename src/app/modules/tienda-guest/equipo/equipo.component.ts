import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
 
import { ValidarpagoComponent } from 'src/app/shared/validarpago/validarpago.component';
import { BiografiaComponent } from 'src/app/shared/biografia/biografia.component';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})

export class equipoComponent {
  INSTRUCTORES:any = [];
constructor(
    public tiendaGuestService: TiendaGuestService, 
   
   
    
  ) {
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tiendaGuestService.getinstructores().subscribe((resp:any) => {
  
      
      this.INSTRUCTORES = resp;
      
      
    })
    
  }


 openbio(url:any):void{
 
  //  this._modalService.show<any>(  BiografiaComponent,{title:"RESEÑA",model:{url:url},size:3}).result().subscribe((resp:any)=>{ })
   
  }

}
