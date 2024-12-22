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

    this.tiendaGuestService.getstatuspay(this.orden).subscribe((resp:any) => {
      console.log(resp);
      if(resp.statusCode==200)
     { this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'primary'});
      this.respmsj=resp.message;
       }
    })
  }
}
