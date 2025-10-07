import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { RouterModule } from '@angular/router';
 
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AuthInterceptor } from './interceptors/auth.interceptor';
//import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

//const config: SocketIoConfig = { url: 'http://localhost:4000', options: {} };
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
  //  SocketIoModule.forRoot(config),
    BrowserModule,
    RouterModule,
    ToastNotificationsModule.forRoot({duration:6000,type:'primary',position:'top-right'}),
    AppRoutingModule,
    HttpClientModule,
BrowserAnimationsModule,
  ],
   providers: [
    {
      // Provee tu interceptor a Angular
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // Es importante usar multi: true ya que puede haber varios interceptores
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
