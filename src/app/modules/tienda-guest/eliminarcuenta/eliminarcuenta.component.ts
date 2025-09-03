import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
  selector: 'app-eliminarcuenta',
  templateUrl: './eliminarcuenta.component.html',
  styleUrls: ['./eliminarcuenta.component.css']
})
export class EliminarcuentaComponent {
  email:string='';
  respmsj:string='';
  constructor( 
   
    public tiendaGuestService: TiendaGuestService,    public toaster: Toaster
  ){ 
  }


  
  enviarmail():void{
    if( !this.email ){
      this.toaster.open({text: 'faltan datos del usuario',caption: 'VALIDACIÓN',type: 'danger'});
     
      return;
    }
    this.tiendaGuestService.enviarmail(this.email).subscribe((resp:any) => {
   
      if(resp.statusCode == 200) 
     { this.toaster.open({text:resp.message,caption: 'VALIDACIÓN',type: 'primary'});}
       
       
    })
  }
}
