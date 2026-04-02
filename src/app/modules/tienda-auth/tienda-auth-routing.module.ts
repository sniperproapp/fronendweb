import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TiendaAuthComponent } from './tienda-auth.component';
import { CartsComponent } from './carts/carts.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { CourseLeasonComponent } from './course-leason/course-leason.component';
import { CourseLeasonClaseComponent } from './course-leason-personalizados/course-leason-personalizados.component';

const routes: Routes = [{
  path: '',
  component: TiendaAuthComponent,
  children: [
    {
      path: 'carrito-de-compra',
      component: CartsComponent,
    },
    {
      path: 'perfil-del-estudiante',
      component: StudentDashboardComponent,
    }
    ,
    {
      path: 'ver-curso/:slug/:seccion/:clase',
      component: CourseLeasonComponent,
    }
     ,
    {
      path: 'ver-curso-clase/:slug/:seccion/:clase',
      component: CourseLeasonClaseComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaAuthRoutingModule { }
