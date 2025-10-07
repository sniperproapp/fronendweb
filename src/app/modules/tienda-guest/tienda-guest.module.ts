import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiendaGuestRoutingModule } from './tienda-guest-routing.module';
import { TiendaGuestComponent } from './tienda-guest.component';
import { LandingCourseComponent } from './landing-course/landing-course.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FiltersCoursesComponent } from './filters-courses/filters-courses.component';
 
import { InstructorComponent } from './instructor/instructor.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { CartsMensualComponent } from './carts/cartsmensual.component';
import { LandingMensualidadComponent } from './landing-mensualidad/landing-mensualidad.component';
import { UpdatepassComponent } from './updatepass/updatepass.component';
import { EliminarcuentaComponent } from './eliminarcuenta/eliminarcuenta.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { InstructoCursoComponent } from './instructor-curso/instructor-curso.component';


@NgModule({ declarations: [
        TiendaGuestComponent,
        LandingCourseComponent,
        FiltersCoursesComponent,
        ContactosComponent,
        InstructorComponent,
        InstructoCursoComponent,
        QuienessomosComponent,
        CartsMensualComponent,
        LandingMensualidadComponent,
        UpdatepassComponent,
        EliminarcuentaComponent,
        PoliticasComponent
    ], imports: [CommonModule,
        TiendaGuestRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class TiendaGuestModule { }
