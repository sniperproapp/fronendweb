import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ActivatedRoute } from '@angular/router';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css']
})
export class UpdatepassComponent {
  password_register:string=''; 
  password_confir_register:string='';
  tokenpass:string='';
constructor(   public tiendaGuestService: TiendaGuestService,public activedRouter: ActivatedRoute,public toaster: Toaster,){

}

 ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRouter.params.subscribe((resp:any) => {
      this.tokenpass = resp.id;
      console.log(resp.id)
    })
    
   
  }

  register(){
    if( !this.password_register   || !this.password_confir_register ){
      this.toaster.open({text: 'faltan datos del usuario',caption: 'VALIDACIÓN',type: 'danger'});
     
      return;
    }
    if( this.password_register!=this.password_confir_register ){
      this.toaster.open({text: 'las claves no son iguales',caption: 'VALIDACIÓN',type: 'danger'});
     
      return;
    }
    let  data ={
     
     password:this.password_register,
     tokenpass:this.tokenpass
     
    }


    this.tiendaGuestService.updatepass(data).subscribe((resp:any)=>{
       console.log(resp)

      if(resp.statusCode == 200){ 
      this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'primary'});
      
      } 
    })
  }
}
