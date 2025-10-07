import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { RouterModule } from '@angular/router';
 
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
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
   ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
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
  bootstrap: [AppComponent],exports:[RouterModule]
})
export class AppModule { }
