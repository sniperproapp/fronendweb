import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaAuthRoutingModule } from './tienda-auth-routing.module';
import { CartsComponent } from './carts/carts.component';
import { TiendaAuthComponent } from './tienda-auth.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseLeasonComponent } from './course-leason/course-leason.component';
import { ModalModule } from '@developer-partners/ngx-modal-dialog';
import { BinancepayComponent } from './binancepay/binancepay.component';


@NgModule({
  declarations: [
    CartsComponent,
    TiendaAuthComponent,
    StudentDashboardComponent,
    CourseLeasonComponent,
    BinancepayComponent
  ],
  imports: [
    CommonModule,
    TiendaAuthRoutingModule,
    SharedModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ModalModule
  ]
})
export class TiendaAuthModule { }
