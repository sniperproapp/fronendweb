// src/app/app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations'; // 1. Añade esto

import { provideToastr } from 'ngx-toastr'; // 2. Añade esto
import { routes } from './app-routing.module';
import { SocketIoConfig } from 'ngx-socket-io';
   const config: SocketIoConfig = { 
  url: 'http://localhost:3000', // URL de tu servidor NestJS
  options: {} 
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    
    // 3. Proporciona las animaciones del navegador
    provideAnimations(), 
  
    // 4. Proporciona el servicio de Toastr, configurándolo globalmente
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      // ...otras opciones de configuración
    })
  ]
};