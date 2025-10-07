import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService  } from 'ngx-toastr';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css']
})
export class UpdatepassComponent {
  password_register:string=''; 
  password_confir_register:string='';
  tokenpass:string='';
constructor(   public tiendaGuestService: TiendaGuestService,public activedRouter: ActivatedRoute,public ToastrService : ToastrService ,){

}

 ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRouter.params.subscribe((resp:any) => {
      this.tokenpass = resp.id;
       
    })
    
   
  }

  register(){
    if( !this.password_register   || !this.password_confir_register ){
      this.ToastrService .success(  'faltan datos del usuario' , 'danger' );
     
      return;
    }
    if( this.password_register!=this.password_confir_register ){
      this.ToastrService .success(  'las claves no son iguales',  'danger' );
     
      return;
    }
    let  data ={
     
     password:this.password_register,
     tokenpass:this.tokenpass
     
    }


    this.tiendaGuestService.updatepass(data).subscribe((resp:any)=>{
       

      if(resp.statusCode == 200){ 
      this.ToastrService .success(  resp.message, 'primary' );
      
      } 
    })
  }
}
