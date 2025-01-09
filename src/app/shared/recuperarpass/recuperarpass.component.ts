import { Component } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
  selector: 'app-recuperarpass',
  templateUrl: './recuperarpass.component.html',
  styleUrls: ['./recuperarpass.component.css']
})
export class RecuperarpassComponent {
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
      console.log(resp);
      if(resp.statusCode == 200) 
     { this.toaster.open({text:resp.message,caption: 'VALIDACIÓN',type: 'primary'});}
       
       
    })
  }
}
