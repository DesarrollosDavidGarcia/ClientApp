import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ServicioAlerta {
  constructor() {}


  // mostrarExito(mensaje: string): void {
  //   Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 1500, title: mensaje, text: '', icon: 'success', width: 500});
  // }

  // mostrarAdvertencia(mensaje: string): void {
  //   Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 1500, title: mensaje, text: '', icon: 'info', width: 500});

  // }

  // mostrarError(mensaje: string): void {
  //   Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 1500, title: mensaje, text: '', icon: 'error', width: 500});
  // }

  // mostrarExiste(mensaje: string): void {
  //   Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 1500, title: mensaje, text: '', icon: 'warning', width: 500});
  // }

  mostrarMensaje(mensaje: string, icono: SweetAlertIcon): void {

    Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 2500, title: mensaje, text: '', icon: icono, width: 500});
  }

  mostrarMensajeErrorInterno(): void {

    Swal.fire({ toast: true, position: 'top', showConfirmButton: false, timer: 2500, title: "Error interno del sistema contacte, al administrador...", text: '', icon: "error", width: 500});
  }


  mostrarCargando(){
    Swal.showLoading();
  }

  ocultarCargando(){
    Swal.hideLoading();
  }


}
