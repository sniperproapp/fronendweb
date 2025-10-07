import { Component } from '@angular/core';
import { TiendaAuthService } from '../service/tienda-auth.service';
import { Toaster } from 'ngx-toast-notifications';
import { CartService } from '../../home/service/cart.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../home/service/alerta.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {

  nav_option:number = 1;

  enrolled_course_count:number = 0;
  actived_course_count:number = 0;
  termined_course_count:number = 0;
  
  profile_student: any;
 
  enrolled_course_news:any = [];
  actived_course_news:any = [];
  termined_course_news:any = [];
  referrals:any = [];
  comisiones:any = [];
  codigo2afdata:string =''

  sales:any = [];
  // USER
  name:string = '';
  saldo:number=0 ;
  saldototal:number =0;
  iduser:string = '';
  surname:string = '';
  email:string = '';
  wallet:string = '';
  avatar:any = null;
  avatar_previzualiza:any = null;
  password:string = '';
  password_confirmation:string = '';
  profession:string = '';
  description:string = '';
  phone:string = '';
  birthday:string = '';
  estadomensualidad:number=0
  rol:number=0


   progressWidth: string = '0%';
  progressText: string = '0%';
  
  // Variables de control
  private currentWidth: number = 0;
  private intervalId: any;
  
  // Constantes de tiempo
  private readonly TOTAL_DURATION_MS = 10000; // 10 segundos
  private readonly INTERVAL_TIME_MS = 100;    // Actualizar cada 100 ms
  
  // Cálculo de incremento: (100 ms / 10000 ms) * 100 = 1%
  private readonly INCREMENT_PER_STEP: number = (this.INTERVAL_TIME_MS / this.TOTAL_DURATION_MS) * 100;


  sales_details:any = [];
  sale_detail_selected:any = null;
  description_review:any = null;
  rating:number = 0;
  constructor(private alertaService: AlertaService,
    public tiendaAuthService: TiendaAuthService,
    public toaster: Toaster,
     public cartService: CartService,public router:Router
  ) {
    
  }
  ngOnInit(): void {
 // Inicia la barra de progreso automáticamente al cargar el componente
    
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.tiendaAuthService.profileStudent().subscribe((resp:any) => {
      console.log(resp)
      this.saldo=Number(resp.comisionesSuma.totalPrice)
      this.saldototal=Number(resp.comisionesSumatotal.totalPrice)
      this.referrals=resp.referral
      this.comisiones=resp.comisiones
      this.enrolled_course_count = resp.enrolled_course_count;
      this.actived_course_count = resp.actived_course_count;
      this.termined_course_count = resp.termined_course_count;
      this.profile_student = resp.profile;
      this.iduser=this.profile_student.id;
      this.name = this.profile_student.name;
      this.rol=this.profile_student.rol.findIndex( (rol: { id: string; })  => rol.id === 'PROF')
      console.log('this.rol')
      console.log(this.rol)
      this.wallet = this.profile_student.wallet;
      this.surname = this.profile_student.surname;
      this.email = this.profile_student.email;
      this.estadomensualidad=this.profile_student.estadomensualidad
      // this.avatar = this.profile_student.avatar;
      this.avatar_previzualiza = this.profile_student.avatar ? this.profile_student.avatar : 'assets/images/team/avatar-2.jpg';
      this.profession = this.profile_student.profession;
      this.description = this.profile_student.description;
      this.phone = this.profile_student.phone;
      this.birthday = this.profile_student.birthday_format;
      this.enrolled_course_news = resp.enrolled_course_news;
      this.actived_course_news = resp.actived_course_news;
      this.termined_course_news = resp.termined_course_news;
      // console.log(this.termined_course_news)
      // console.log(this.enrolled_course_news) 
      this.sales = resp.sales;
      this.sales_details = resp.sales_details;
    })
  }

  navOption(val:number) {
    this.nav_option = val;
  }

codigo2af(){
   this.progressWidth   = '0%';
  this.progressText  = '0%';
  
  // Variables de control
    this.currentWidth   = 0;
   this.tiendaAuthService.codigo2af().subscribe((resp:any) => {
    console.log(resp)
    this.codigo2afdata=resp
    this.intervalId = setInterval(() => this.moveBar(), this.INTERVAL_TIME_MS);

   })
}
 moveBar(): void {
    if (this.currentWidth >= 100) {
      // 1. Carga completada: Limpiar y finalizar
      clearInterval(this.intervalId);
      this.progressText = 'SOLICITAR OTRO CODIGO';
    } else {
      // 2. Incrementar el ancho
      this.currentWidth += this.INCREMENT_PER_STEP;
      this.currentWidth = Math.min(this.currentWidth, 100); // Asegura que no pase de 100
      
      // 3. Actualizar las propiedades enlazadas al HTML
      this.progressWidth = this.currentWidth.toFixed(2) + '%';
      this.progressText = Math.floor(this.currentWidth) + '';
    }
  }

  // IMPORTANTE: Limpiar el intervalo al destruir el componente para evitar fugas de memoria
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  showDetails(sale:any){
    sale.is_detail = true;
  }
  logout(){
    this.tiendaAuthService.authService.logoutweb(this.email).subscribe((resp:any) => {
    // this.toaste
    this.tiendaAuthService.authService.logout();
    })
    
   
  }

  processFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      this.toaster.open({text: 'NECESITAS SUBIR UN ARCHIVO DE TIPO IMAGEN',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    this.avatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.avatar);
    reader.onloadend = () => this.avatar_previzualiza = reader.result;
  }


  updatedStudentpass(){
    if(this.password || this.password_confirmation){
      if(this.password != this.password_confirmation){
        this.toaster.open({text: 'LAS CONTRASEÑAS TIENE QUE SER IGUALES',caption: 'VALIDACIÓN',type: 'warning'});
        return;
      }
    }



    
  let data={
     
    "email":this.email ,
    "password":this.password ,
     

 }
 
 this.tiendaAuthService.updateStudentpass(data).subscribe((resp:any) => {
    
   if(resp){
     this.toaster.open({text: "clave editada correctamente",caption: 'VALIDACIÓN',type: 'primary'});
     this.password=''
     this.password_confirmation=''
   }else{
     this.toaster.open({text: "ocurrio un error" ,caption: 'PROCESO CORRECTO',type: 'warning'});
       
   }
 })

  }


    activarLeyenda() {
    // Llama al servicio para propagar el estado 'true' a toda la aplicación
    this.alertaService.activarLeyendaGlobal();
  }

  desactivarLeyenda() {
    // Llama al servicio para propagar el estado 'false' a toda la aplicación
    this.alertaService.desactivarLeyendaGlobal();
  }


  updatedStudent(){
    if(!this.name  || !this.surname || !this.email){
      this.toaster.open({text: 'NECESITAS COMPLETAR LOS CAMPOS OBLIGATORIOS',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    


    if(this.avatar){
      let formData = new FormData();

     
      formData.append("name",this.name);
      formData.append("lastname",this.surname);
      formData.append("email",this.email);
      formData.append("phone",this.phone);
      formData.append("wallet",this.wallet);
      formData.append("profession",this.profession);
      formData.append("description",this.description);
      if(this.birthday){
        formData.append("birthday",this.birthday);
      }
      if(this.password){
        formData.append("password",this.password);
      }
      if(this.avatar){
        formData.append("file",this.avatar);
        this.tiendaAuthService.updateStudentwihtimagen(this.iduser,formData).subscribe((resp:any) => {
           
          if(resp.message == 200){
            this.toaster.open({text: resp.message_text,caption: 'VALIDACIÓN',type: 'warning'});
          }else{
            this.toaster.open({text: resp.message_text,caption: 'PROCESO CORRECTO',type: 'primary'});
            localStorage.setItem("user",JSON.stringify({
              name: resp.user.name,
              email: resp.user.email,
              surname: resp.user.surname, 
             }));
          }
        })
  
      }

    }else{
  let data={
     "name":this.name ,
     "lastname":this.surname ,
     "email":this.email ,
     "phone":this.phone ,
     "wallet":this.wallet ,
     "profession":this.profession ,
     "description":this.description 

  }
  
  this.tiendaAuthService.updateStudent(this.iduser,data).subscribe((resp:any) => {
     
    if(resp.typecode == 200){
      this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'warning'});
    }else{
      this.toaster.open({text: "Editado correctamente",caption: 'PROCESO CORRECTO',type: 'primary'});
       localStorage.setItem("user",JSON.stringify({
         name: resp.name,
         email: resp.email,
         surname: resp.surname, 
        }));
    }
  })

    }
    
   

    
     

    
  }

  showReview(sale_detail:any){
    this.sale_detail_selected = sale_detail;
    this.rating = this.sale_detail_selected.review ? this.sale_detail_selected.review.rating : '';
    this.description_review = this.sale_detail_selected.review ? this.sale_detail_selected.review.description : '';
  }
  selectedRating(val:number){
    this.rating = val;
  }
  back(){
    this.sale_detail_selected = null;
  }
  saveReview(){
    if(this.rating == 0){
      this.toaster.open({text: 'NECESITAS SELECCIONAR UNA CALIFICACIÓN',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    if(!this.description_review){
      this.toaster.open({text: 'NECESITAS DIGITAR UNA DESCRIPCIÓN',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    let data = {
      id_curso: this.sale_detail_selected.course.id,
      id_user: this.iduser,
      id_saledetail: this.sale_detail_selected.id,
      rating: this.rating,
      description: this.description_review,
    }
    this.tiendaAuthService.registerReview(data).subscribe((resp:any) => {
       

      this.toaster.open({text: "creado correctamente",caption: 'VALIDACIÓN',type: 'primary'});

      let index = this.sales_details.findIndex((item:any) => item.id == this.sale_detail_selected.id);
      if(index != -1){
        this.sales_details[index].review = resp;
      }
      this.rating = 0;
      this.description_review = '';
      this.sale_detail_selected = null;
    })
  }
  updateReview(){
    if(this.rating == 0){
      this.toaster.open({text: 'NECESITAS SELECCIONAR UNA CALIFICACIÓN',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    if(!this.description_review){
      this.toaster.open({text: 'NECESITAS DIGITAR UNA DESCRIPCIÓN',caption: 'VALIDACIÓN',type: 'warning'});
      return;
    }
    let data = {
      id_curso: this.sale_detail_selected.course.id,
      id_saledetail: this.sale_detail_selected.id,
      rating: this.rating,
      id_user: this.iduser,
      description: this.description_review,
      id: this.sale_detail_selected.review.id,
    }
    this.tiendaAuthService.updateReview(data).subscribe((resp:any) => {
      

      this.toaster.open({text: "Editado correctamente",caption: 'VALIDACIÓN',type: 'primary'});

      let index = this.sales_details.findIndex((item:any) => item.id == this.sale_detail_selected.id);
      if(index != -1){
        this.sales_details[index].review = resp;
      }
    })
  }


  createpay(id:number){
     
    this.toaster.open({text:"Retirando.....",caption: 'VALIDACIÓN',type: 'primary'});
this.tiendaAuthService.createpay(id).subscribe((resp:any) => {
 
   if(resp.statusCode==200)
  {
    this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'primary'});
    this.tiendaAuthService.profileStudent().subscribe((resp:any) => {
     // console.log(resp)
      this.saldo=Number(resp.comisionesSuma.totalPrice)
      this.saldototal=Number(resp.comisionesSumatotal.totalPrice)
      this.referrals=resp.referral
      this.comisiones=resp.comisiones
      this.enrolled_course_count = resp.enrolled_course_count;
      this.actived_course_count = resp.actived_course_count;
      this.termined_course_count = resp.termined_course_count;
      this.profile_student = resp.profile;
      this.iduser=this.profile_student.id;
      this.name = this.profile_student.name;
      this.wallet = this.profile_student.wallet;
      this.surname = this.profile_student.surname;
      this.email = this.profile_student.email;
      this.estadomensualidad=this.profile_student.estadomensualidad
      // this.avatar = this.profile_student.avatar;
      this.avatar_previzualiza = this.profile_student.avatar ? this.profile_student.avatar : 'assets/images/team/avatar-2.jpg';
      this.profession = this.profile_student.profession;
      this.description = this.profile_student.description;
      this.phone = this.profile_student.phone;
      this.birthday = this.profile_student.birthday_format;
      this.enrolled_course_news = resp.enrolled_course_news;
      this.actived_course_news = resp.actived_course_news;
      this.termined_course_news = resp.termined_course_news;
      // console.log(this.termined_course_news)
      // console.log(this.enrolled_course_news) 
      this.sales = resp.sales;
      this.sales_details = resp.sales_details;
    })
  }
  if(resp.statusCode==400)
  {
    this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'primary'});
  }
})

  }


  addCart(){
     
    let data = {
      id_user:this.iduser,
      id_curso: 59,
      type_discount:   null,
      discount:   null,
      campaign_discount:   null,
      code_cupon: null,
      code_discount:   null,
      price_unit: 15,
    
       subtotal:15,
      total:15
    
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
     // console.log(resp)
      if(resp.statusCode == 200){
        this.toaster.open({text: resp.message,caption: 'VALIDACIÓN',type: 'danger'});
      }else{
        this.cartService.addCart(resp);
        this.toaster.open({text: 'Genera el link de pago',caption: 'VALIDACIÓN',type: 'primary'});
         this.router.navigateByUrl("/carrito-de-compra")
      }
      
    
    });
  }

}
