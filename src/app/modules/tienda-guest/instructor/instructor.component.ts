import { Component } from '@angular/core';
import { TiendaGuestService } from '../service/tienda-guest.service';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})

export class InstructorComponent {
  INSTRUCTORES:any = [];
constructor(
    public tiendaGuestService: TiendaGuestService,
   
   
    
  ) {
    
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.tiendaGuestService.getinstructores().subscribe((resp:any) => {
      console.log(resp);
      
      this.INSTRUCTORES = resp;
      
      
    })
    
  }




}
