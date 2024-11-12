import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

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
   


  constructor(public authServices: AuthService,public router:Router){

  }

  ngOnInit(): void{
     console.log(this.authServices.user)
     if(this.authServices.user){
         this.router.navigateByUrl('/')
     }
  }

  login(){
    if(!this.email_login || !this.password_login){
      alert("faltan datos del usuario")
      return;
    }
    this.authServices.login(this.email_login,this.password_login).subscribe((resp:any)=>{
      console.log(resp)
      if(resp.status==403||resp.status==500){
        alert(resp.error.message)
       return;
        }

      if(resp){window.location.reload();}
      
    })
  }


  register(){
    if(!this.email_register ||!this.password_register ||!this.name_register ||!this.surname_register  || !this.password_confir_register ){
      alert("faltan datos del usuario")
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
        alert(resp.error.message)
      }else{
        alert("registro exitoso")
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
