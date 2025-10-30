import { Component } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
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
   
    public tiendaGuestService: TiendaGuestService,    public ToastrService : ToastrService,
  ){ 
  }




  getestadodelpago():void{
    if( !this.orden ){
      this.ToastrService .error( 'faltan numero de orden ' ,'danger');
     
      return;
    }

    this.tiendaGuestService.getstatuspay(this.orden).subscribe((resp:any) => {
       
      if(resp.statusCode==200)
     { this.ToastrService .success(  resp.message, 'Exito');
      this.respmsj=resp.message;
       }
    })
  }
}
