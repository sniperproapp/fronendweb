import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';
 
import { ValidarpagoComponent } from 'src/app/shared/validarpago/validarpago.component';
import { BiografiaComponent } from 'src/app/shared/biografia/biografia.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-instructor',
    templateUrl: './instructor.component.html',
    styleUrls: ['./instructor.component.css'],
    standalone: false
})

export class InstructorComponent {
  INSTRUCTORES:any = [];
constructor(private dialog: MatDialog,
    public tiendaGuestService: TiendaGuestService, 
   
   
    
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
    //this._modalService.show<any>(  BiografiaComponent,{title:"RESEÑA",model:{url:url},size:3}).result().subscribe((resp:any)=>{ })
   
  }

}
