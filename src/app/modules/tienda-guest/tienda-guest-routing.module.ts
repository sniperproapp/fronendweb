import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaGuestComponent } from './tienda-guest.component';
import { LandingCourseComponent } from './landing-course/landing-course.component';
import { FiltersCoursesComponent } from './filters-courses/filters-courses.component';
 
import { InstructorComponent } from './instructor/instructor.component';
import { QuienessomosComponent } from './quienessomos/quienessomos.component';
import { ContactosComponent } from './contactos/contactos.component';
import { CartsMensualComponent } from './carts/cartsmensual.component';
import { LandingMensualidadComponent } from './landing-mensualidad/landing-mensualidad.component';
import { UpdatepassComponent } from './updatepass/updatepass.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaGuestComponent,
    children: [
      {
        path: 'landing-curso/:slug',
        component: LandingCourseComponent,
      },
      {
        path: 'landing-mensualidad/:slug',
        component: LandingMensualidadComponent,
      },
      {
        path: 'updatepass/:id',
        component: UpdatepassComponent,
      },
      {
        path: 'filtros-de-cursos',
        component: FiltersCoursesComponent,
      },
      {
        path: 'contactos',
        component: ContactosComponent,
      },
      {
        path: 'team',
        component: InstructorComponent,
      }
      ,
      {
        path: 'mensualidad',
        component: CartsMensualComponent,
      }
      ,
      {
        path: 'somos',
        component: QuienessomosComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaGuestRoutingModule { }
