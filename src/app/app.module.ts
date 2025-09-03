import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { RouterModule } from '@angular/router';
 
import { YouTubePlayerModule } from "@angular/youtube-player";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
 
    BrowserModule,
    RouterModule,
    ToastNotificationsModule.forRoot({duration:6000,type:'primary',position:'top-right'}),
    AppRoutingModule,
    HttpClientModule,
BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
