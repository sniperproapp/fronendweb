import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidarpagoComponent } from './validarpago/validarpago.component';
import { RecuperarpassComponent } from './recuperarpass/recuperarpass.component';
import { BiografiaComponent } from './biografia/biografia.component';
//import { LeyendaComponent } from './leyenda/leyenda.component';



@NgModule({
  declarations: [
    HeaderComponent,
    //LeyendaComponent,
    FooterComponent,
    ValidarpagoComponent,
    BiografiaComponent,
    RecuperarpassComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,ValidarpagoComponent,BiografiaComponent
  ]
})
export class SharedModule { }
