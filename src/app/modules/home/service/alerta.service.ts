import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
 
import { URL_SERVICIOS } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class AlertaService {
  // Inicializamos el estado en 'false' (oculto)
  private mostrarAlertaSubject = new BehaviorSubject<boolean>(false);
  
  // Observable que los componentes Home consumirán
 
 public readonly   mostrarAlerta$: Observable<boolean> = this.mostrarAlertaSubject.asObservable();

  constructor( public http: HttpClient,) { 
    // Opcional: Cargar el estado inicial del servidor al iniciar la app
    // En un entorno real, aquí harías una llamada HTTP para ver el estado global.
     this.mostrarAlertaSubject.next(true);
  }

  // Método llamado por el componente Administrador (el botón)
  activarLeyendaGlobal() {
  //  let headers = new HttpHeaders({'Authorization': this.authService.token});
      let URL = URL_SERVICIOS+"zomm/mostrar-leyenda/";
      return this.http.get(URL);
  }



    courseLeason(slug:string){
     
    }
  // Método para ocultar la leyenda
  desactivarLeyendaGlobal() {
    // 1. (REAL) Llamada HTTP para desactivar en la DB.
    this.mostrarAlertaSubject.next(false);
  }
}