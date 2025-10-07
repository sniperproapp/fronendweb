// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-leyenda',
//   templateUrl: './leyenda.component.html',
//   styleUrls: ['./leyenda.component.css']
// })
// export class LeyendaComponent implements OnInit, OnDestroy {
//   visible = false;
//   mensaje = '';
//   private leyendaSubscription: Subscription | undefined;

//   constructor(private socket: Socket) { }

//   ngOnInit(): void {
//     // Escucha el evento 'nueva-leyenda' que envía el servidor
//     this.leyendaSubscription = this.socket.fromEvent<{ mensaje: string }>('nueva-leyenda')
//       .subscribe((payload) => {
//         console.log('Mensaje recibido del servidor:', payload);
//         this.mensaje = payload.mensaje;
//         this.visible = true;
//       });
//   }

//   cerrar(): void {
//     this.visible = false;
//   }
  
//   ngOnDestroy(): void {
//     // Buena práctica: desuscribirse para evitar fugas de memoria
//     if (this.leyendaSubscription) {
//       this.leyendaSubscription.unsubscribe();
//     }
//   }
// }