import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ValidarpagoComponent } from './validarpago/validarpago.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidarpagoComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,ValidarpagoComponent
  ]
})
export class SharedModule { }
