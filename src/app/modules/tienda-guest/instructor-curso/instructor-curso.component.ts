import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BiografiaComponent } from 'src/app/shared/biografia/biografia.component';
 

@Component({
  standalone:true,
  selector: 'app-instructor-curso',
  templateUrl: './instructor-curso.component.html',
  styleUrls: ['./instructor-curso.component.css'],
  imports: [
    CommonModule, // ¡AÑADIDO! Contiene *ngIf, *ngFor, ngClass, ngStyle, etc.
    FormsModule, 
    RouterModule, // ¡AÑADIDO! Contiene ngModel
  ],
})

export class InstructoCursoComponent {
  INSTRUCTORES:any = [];
constructor(private dialog: MatDialog,
    public tiendaGuestService: TiendaGuestService 
   
   
    
  ) {
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tiendaGuestService.getinstructores().subscribe((resp:any) => {
    
      
      this.INSTRUCTORES = resp;
      
      
    })
    
  }


 openbio(url:any):void{
   this.dialog.open(BiografiaComponent, {  data: {url:url} , 
         width: '1000px', // Opciones de configuración
       });
   // this._modalService.show<any>(  BiografiaComponent,{title:"RESEÑA",model:{url:url},size:3}).result().subscribe((resp:any)=>{ })
   
  }

}
