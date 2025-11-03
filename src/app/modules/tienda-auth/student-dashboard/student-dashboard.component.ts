import { Component } from '@angular/core';
import { TiendaAuthService } from '../service/tienda-auth.service';
 
import { CartService } from '../../home/service/cart.service';
import { Router } from '@angular/router';
import { AlertaService } from '../../home/service/alerta.service';
import { ToastrService } from 'ngx-toastr';
import { ExcelService } from 'src/app/shared/reportesexcel/excel.service';

@Component({
    selector: 'app-student-dashboard',
    templateUrl: './student-dashboard.component.html',
    styleUrls: ['./student-dashboard.component.css'],
    standalone: false
})
export class StudentDashboardComponent {

  nav_option:number = 1;

  enrolled_course_count:number = 0;
  actived_course_count:number = 0;
  termined_course_count:number = 0;
  
  profile_student: any;
   listsales:any
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
  balance:any
  comisionestotal:any
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
  constructor(private excelService: ExcelService,private alertaService: AlertaService,
    public tiendaAuthService: TiendaAuthService,
   public ToastrService : ToastrService,
     public cartService: CartService,public router:Router
  ) {
    
  }
  ngOnInit(): void {
 // Inicia la barra de progreso automáticamente al cargar el componente
    
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
     
       this.tiendaAuthService.getbalace().subscribe((resp:any) => {
      
       this.balance= resp[0].balances
       this.comisionestotal=resp[0].comisiones 
    
           
          
          

       })



       this.tiendaAuthService.getallsales().subscribe((resp:any) => {
       console.log(resp)
      this.listsales=resp
       

       })

     
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
      this.rol=this.profile_student.rol.findIndex( (rol: { id: string; })  => rol.id === 'PROF')
      
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


  descargarexcel(){
      
      
      const nombreArchivo = 'Reporte_Transacciones_Referidos';
         this.excelService.exportAsExcelFile( this.listsales as any, nombreArchivo)

       
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
    if($event.target.files[0].indexOf("image") < 0){
      this.ToastrService .error(  'NECESITAS SUBIR UN ARCHIVO DE TIPO IMAGEN'  ,'warning' );
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
        this.ToastrService .error(  'LAS CONTRASEÑAS TIENE QUE SER IGUALES' , 'warning' );
        return;
      }
    }



    
  let data={
     
    "email":this.email ,
    "password":this.password ,
     

 }
 
 this.tiendaAuthService.updateStudentpass(data).subscribe((resp:any) => {
    
   if(resp){
     this.ToastrService .success( "clave editada correctamente" , 'Exito' );
     this.password=''
     this.password_confirmation=''
   }else{
     this.ToastrService .error( "ocurrio un error"  , 'warning' );
       
   }
 })

  }


    activarLeyenda() {
    // Llama al servicio para propagar el estado 'true' a toda la aplicación
    
      this.alertaService.activarLeyendaGlobal().subscribe((resp:any) => {
       // console.log(resp)
      })
  }

  desactivarLeyenda() {
    // Llama al servicio para propagar el estado 'false' a toda la aplicación
    this.alertaService.desactivarLeyendaGlobal();
  }


  updatedStudent(){
    if(!this.name  || !this.surname || !this.email){
      this.ToastrService .error( 'NECESITAS COMPLETAR LOS CAMPOS OBLIGATORIOS',   'warning' );
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
            this.ToastrService .error( resp.message_text,   'warning' );
          }else{
            this.ToastrService .success( resp.message_text,  'exito' );
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
     
    if(resp.ode == 200){
      this.ToastrService .success( resp.message,   'Éxito' );
    }else{
      console.log('listo')
      this.ToastrService .success( "Editado correctamente",
      );
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
      this.ToastrService .error( 'NECESITAS SELECCIONAR UNA CALIFICACIÓN',  'warning' );
      return;
    }
    if(!this.description_review){
      this.ToastrService .error( 'NECESITAS DIGITAR UNA DESCRIPCIÓN',   'warning' );
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
       

      this.ToastrService .success( "creado correctamente",   'Exito' );

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
      this.ToastrService .error( 'NECESITAS SELECCIONAR UNA CALIFICACIÓN',  'warning' );
      return;
    }
    if(!this.description_review){
      this.ToastrService .error( 'NECESITAS DIGITAR UNA DESCRIPCIÓN',  'warning');
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
      

      this.ToastrService .success( "Editado correctamente",   'Exito' );

      let index = this.sales_details.findIndex((item:any) => item.id == this.sale_detail_selected.id);
      if(index != -1){
        this.sales_details[index].review = resp;
      }
    })
  }


  createpay(id:number){
     
    this.ToastrService .success("Retirando.....",  'Exito' );
this.tiendaAuthService.createpay(id).subscribe((resp:any) => {
 
   if(resp.statusCode==200)
  {
    this.ToastrService .success( resp.message,   'Exito' );

      
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
    this.ToastrService .success( resp.message,   'Exito' );
  }
})

  }


  addCart(){
     
    let data = {
      id_user:this.iduser,
      id_curso: 59,
      discount:   null,
    
      campaign_discount:   null,
      code_cupon: null,
      code_discount:   null,
      price_unit:50,
    
       subtotal:50,
      total:50
    
    }

    this.cartService.registerCartmensualidad(data).subscribe((resp:any) => {
     // console.log(resp)
      if(resp.statusCode == 200){
        this.ToastrService .error( resp.message,  'danger' );
      }else{
        this.cartService.addCart(resp);
        this.ToastrService .success( 'Genera el link de pago',   'Exito' );
         this.router.navigateByUrl("/carrito-de-compra")
      }
      
    
    });
  }

  searchcomision(data:any){
   
   const Buscado = data.user.referrer.referrals.find((p:any) => p.referredUserId ===data.user.id);
    
   return Buscado.monto
  }

  searchestado(data:any){
   
   const Buscado = data.user.referrer.referrals.find((p:any) => p.referredUserId ===data.user.id);
   if(Buscado.estado==1)
    {
      return "Pagado"
    }else{
     return "No Pagado"
    }
    
  }

}
