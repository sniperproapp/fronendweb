import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { RouterModule } from '@angular/router';
 import { URL_SERVICIOS } from 'src/app/config/config';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
 import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

 const config: SocketIoConfig = { url: URL_SERVICIOS, options: {} };
@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], exports: [RouterModule], imports: [
          SocketIoModule.forRoot(config),
        BrowserModule,
        RouterModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        AppRoutingModule,
        BrowserAnimationsModule
      
    ], providers: [
        {
            // Provee tu interceptor a Angular
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true // Es importante usar multi: true ya que puede haber varios interceptores
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
