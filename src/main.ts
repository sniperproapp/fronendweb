import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // Requerido para las animaciones
    provideToastr(), // Proveedor para ngx-toastr
  ]
});