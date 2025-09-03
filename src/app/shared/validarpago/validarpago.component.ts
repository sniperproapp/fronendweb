import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
  selector: 'app-validarpago',
  templateUrl: './validarpago.component.html',
  styleUrls: ['./validarpago.component.css']
})
export class ValidarpagoComponent {
  orden:string='';
  respmsj:string='';
  constructor( 
   
    public tiendaGuestService: TiendaGuestService,    public toaster: Toaster,
  ){ 
  }




  getestadodelpago():void{
    if( !this.orden ){
      this.toaster.open({text: 'faltan numero de orden ',caption: 'VALIDACIÓN',type: 'danger'});
     
      return;
    }

    this.tiendaGuestService.getstatuspay(this.orden).subscribe((resp:any) => {
       
      if(resp.statusCode==200)
     { this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'primary'});
      this.respmsj=resp.message;
       }
    })
  }
}
