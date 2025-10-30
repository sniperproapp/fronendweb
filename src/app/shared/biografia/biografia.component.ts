import { Component } from '@angular/core';
 
import { ToastrService  } from 'ngx-toastr';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
    selector: 'app-biografia',
    templateUrl: './biografia.component.html',
    styleUrls: ['./biografia.component.css'],
    standalone: false
})
export class BiografiaComponent {
  orden:string='';
    url: any
  respmsj:string='';
  constructor( 
   
    
 public tiendaGuestService: TiendaGuestService, 
     ) {
    // if(this._modalReference.config.model)
    // {
    //   let copy ={...this._modalReference.config.model}
    //  this.url=copy
 
   

    // }
  }


 
}
