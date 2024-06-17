import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class CargandoService {
  mensaje: string;

  constructor(private spinner: NgxSpinnerService) {}

  public show(mensaje: string): void {
    this.mensaje = mensaje;
    this.spinner.show(undefined, {
      type: 'ball-grid-pulse',
      size: 'large',
      bdColor: '#FFC000',
      color: '#5A5A5A',
      fullScreen: true
    });
  }

  public hide(): void {
    this.spinner.hide();
  }
}
