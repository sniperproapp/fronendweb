import { Component } from '@angular/core';
import { ModalReference, ModalService } from '@developer-partners/ngx-modal-dialog';
import { Toaster } from 'ngx-toast-notifications';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
  selector: 'app-biografia',
  templateUrl: './biografia.component.html',
  styleUrls: ['./biografia.component.css']
})
export class BiografiaComponent {
  orden:string='';
    url: any
  respmsj:string='';
  constructor( 
   
    
 public tiendaGuestService: TiendaGuestService,private readonly _modalReference:ModalReference<any>
     ) {
    if(this._modalReference.config.model)
    {
      let copy ={...this._modalReference.config.model}
     this.url=copy
  console.log(copy)
   

    }
  }


 
}
