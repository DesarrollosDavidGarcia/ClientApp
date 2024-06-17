import { Component, OnInit, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EstadoCivil } from 'src/app/models/catalogos/estado-civil';
import { Menus } from 'src/app/models/seguridad/menus';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-forma-estado-civil',
  templateUrl: './forma-estado-civil.component.html',
  styleUrls: ['./forma-estado-civil.component.scss']
})
export class FormaEstadoCivilComponent implements OnInit , OnDestroy {

  forma: FormGroup;
  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();
  get f() {
    return this.forma.controls;
  }
  modelo: Menus;
  constructor(
    @Inject(MAT_DIALOG_DATA) public registro: EstadoCivil,
    private ventana: MatDialogRef<FormaEstadoCivilComponent>,
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private alerta: ServicioAlerta
  ) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    if (this.registro?.id > 0) {
      Object.assign(this.forma.value, this.registro);
      this.forma.reset(this.forma.value);
    }
  }
  async guardar(): Promise<void> {
    let respuesta: ResultVM<EstadoCivil>;
    try {
      if (this.forma.valid) {
        const model = this.forma.value as EstadoCivil;

        if (this.registro?.id && this.registro.id !== 0) {
          respuesta = await this.ctx.estadoCivil.update(this.registro.id, model);
        } else {
          respuesta = await this.ctx.estadoCivil.add(model);
        }
        if (respuesta.isSuccess) {
          this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
          this.guardado.emit();
          this.cerrar();
        } else {
          this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
        }
      } else {
        this.alerta.mostrarMensaje("Formulario invalido...", "warning");
      }
    } catch (error) {
      this.alerta.mostrarMensaje("Error interno del sistema...", "error");
    }
  }


  cerrar(): void {
    this.ventana.close();
  }

  ngOnDestroy(): void {}
}
