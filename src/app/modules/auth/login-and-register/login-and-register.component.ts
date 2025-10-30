import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { ParamMap, Router } from '@angular/router';
import { ValidarpagoComponent } from 'src/app/shared/validarpago/validarpago.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
 import { ActivatedRoute } from '@angular/router';
import { RecuperarpassComponent } from 'src/app/shared/recuperarpass/recuperarpass.component';
import { ToastrService  } from 'ngx-toastr';
import { ReferralService } from '../../home/service/referral.service';
import { map, Observable } from 'rxjs';
 

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent {


  email_login:string='';
  password_login:string='';

 ref:string=''
 
  email_register:string='';
  password_register:string=''; 
  password_confir_register:string='';
  name_register:string='';
  surname_register:string='';
   
idreferente$!: Observable<string | null>;

  constructor( private route: ActivatedRoute,public referralService: ReferralService, public ToastrService : ToastrService ,public authServices: AuthService,public router:Router,private readonly _modalService:ModalService){

  }

  ngOnInit(): void{
   
     


      this.idreferente$ = this.route.queryParamMap.pipe(
      // Mapea el mapa de parámetros para obtener el valor de 'idreferente'
      map((params: ParamMap) => params.get('ref'))
    );
        
    this.idreferente$.subscribe(codigo => {
      if (codigo) {
        this.ref=codigo
       // console.log('idreferente de URL extraído:', idreferente);
        // Aquí llamas a tu servicio para validar el idreferente y agregar al grupo
      }
    });
    
     if(this.authServices.user){
         this.router.navigateByUrl('/')
     }
     
  }

  login(){
    if(!this.email_login || !this.password_login){
      this.ToastrService .error(  "faltan datos del usuario",  'warning');
      return;
    }
    this.authServices.login(this.email_login,this.password_login).subscribe((resp:any)=>{
     
      if(resp.status==403||resp.status==404||resp.status==500){
        //console.log(resp)
        if(resp.error.message=="Comuníquese con Administración para ser Activado" )
           {
                if(confirm("Tienes la mensualidad vencida deseas pagar")) {
               
                         this.authServices.pago(this.email_login).subscribe((resp:any)=>{
                          //console.log(resp);
                          // window.open(message, '_blank');
                           })
              }
           }
            
        this.ToastrService .error( resp.error.message,  'warning');
       
       return;
        }

      if(resp){window.location.reload();}
      
    })
  }

  validarpago():void{
    
    //this._modalService.show<any>(  ValidarpagoComponent,{title:"pagar",size:1}).result().subscribe((resp:any)=>{})
}

recuperarpass():void{
  
  this._modalService.show<any>(  RecuperarpassComponent,{title:"Recuperar password",size:1}).result().subscribe((resp:any)=>{})
}
  register(){
    if(!this.email_register ||!this.password_register ||!this.name_register ||!this.surname_register  || !this.password_confir_register ){
 
      this.ToastrService .error( "faltan datos del usuario",  'warning');
      
      return;
    }
    let  data ={
     email:this.email_register,
     password:this.password_register,
     name:this.name_register,
     lastname:this.surname_register,
     codigo_refernecia: this.ref


    }


    this.authServices.regisster(data).subscribe((resp:any)=>{
     
        console.log(resp)
      if(resp.status==403||resp.status==500 ||resp.status==400 ){
        this.ToastrService .error( resp.error.message,  'warning');
      
      }else{
        this.ToastrService .success("registro exitoso",  'Exito');

   
        this.clean()
      }
    })
  }


  clean(){

     this.email_register='';
    this.password_register='';
    this.password_confir_register='';
    this.name_register='';
    this.surname_register='';


  }
  
}
