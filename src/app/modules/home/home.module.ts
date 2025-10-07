import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
 


@NgModule({ declarations: [
        HomeComponent
    ], imports: [CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class HomeModule { }
