import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TiendaGuestService } from 'src/app/modules/tienda-guest/service/tienda-guest.service';
export interface DialogData {
  url: string;
   
}
@Component({
    selector: 'app-biografia',
    templateUrl: './biografia.component.html',
    styleUrls: ['./biografia.component.css'],
    standalone: false
})

export class BiografiaComponent {
  orden:string='';
    url: any
    
  respmsj:string='';
  constructor( 
   
    public dialogRef: MatDialogRef<BiografiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
 public tiendaGuestService: TiendaGuestService, 
     ) {
    // if(this._modalReference.config.model)
    // {
    //   let copy ={...this._modalReference.config.model}
    //  this.url=copy
 
   

    // }
  }


 
}
