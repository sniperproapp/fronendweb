import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ValidarpagoComponent } from 'src/app/shared/validarpago/validarpago.component';
import { ModalService } from '@developer-partners/ngx-modal-dialog';
import { UpdatepassComponent } from '../../tienda-guest/updatepass/updatepass.component';
import { RecuperarpassComponent } from 'src/app/shared/recuperarpass/recuperarpass.component';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-login-and-register',
  templateUrl: './login-and-register.component.html',
  styleUrls: ['./login-and-register.component.css']
})
export class LoginAndRegisterComponent {


  email_login:string='';
  password_login:string='';


  email_register:string='';
  password_register:string=''; 
  password_confir_register:string='';
  name_register:string='';
  surname_register:string='';
   


  constructor(public toaster: Toaster,public authServices: AuthService,public router:Router,private readonly _modalService:ModalService){

  }

  ngOnInit(): void{
     console.log(this.authServices.user)
     if(this.authServices.user){
         this.router.navigateByUrl('/')
     }
  }

  login(){
    if(!this.email_login || !this.password_login){
      this.toaster.open({text: "faltan datos del usuario", caption: 'VALIDACION',type: 'warning'});
      return;
    }
    this.authServices.login(this.email_login,this.password_login).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.status==403||resp.status==500){
        this.toaster.open({text: resp.error.message, caption: 'VALIDACION',type: 'warning'});
       
       return;
        }

      if(resp){window.location.reload();}
      
    })
  }

  validarpago():void{
    this._modalService.show<any>(  ValidarpagoComponent,{title:"pagar",size:1}).result().subscribe((resp:any)=>{console.log(resp)})
}

recuperarpass():void{
  this._modalService.show<any>(  RecuperarpassComponent,{title:"Recuperar password",size:1}).result().subscribe((resp:any)=>{console.log(resp)})
}
  register(){
    if(!this.email_register ||!this.password_register ||!this.name_register ||!this.surname_register  || !this.password_confir_register ){
 
      this.toaster.open({text: "faltan datos del usuario", caption: 'VALIDACION',type: 'warning'});
      
      return;
    }
    let  data ={
     email:this.email_register,
     password:this.password_register,
     name:this.name_register,
     lastname:this.surname_register


    }


    this.authServices.regisster(data).subscribe((resp:any)=>{
     

      if(resp.status==403||resp.status==500){
        this.toaster.open({text: resp.error.message, caption: 'VALIDACION',type: 'warning'});
      
      }else{
        this.toaster.open({text:"registro exitoso", caption: 'VALIDACION',type: 'primary'});

   
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
