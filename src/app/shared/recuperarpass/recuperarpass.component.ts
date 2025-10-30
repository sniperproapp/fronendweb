import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
 
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';

@Component({
    selector: 'app-recuperarpass',
    templateUrl: './recuperarpass.component.html',
    styleUrls: ['./recuperarpass.component.css'],
    standalone: false
})
export class RecuperarpassComponent {
  email:string='';
  respmsj:string='';
  constructor( 
   
    public tiendaGuestService: TiendaGuestService,   public ToastrService : ToastrService,
  ){ 
  }


  
  enviarmail():void{
    if( !this.email ){
      this.ToastrService .error(  'faltan datos del usuario',  'danger' );
     
      return;
    }
    this.tiendaGuestService.enviarmail(this.email).subscribe((resp:any) => {
      
      if(resp.statusCode == 200) 
     { this.ToastrService .success(  resp.message,  'Exito' );}
       
       
    })
  }
}
