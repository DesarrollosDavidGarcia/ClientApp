import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { Menus } from 'src/app/models/seguridad/menus';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-forma-menus',
  templateUrl: './forma-menus.component.html',
  styleUrls: ['./forma-menus.component.scss'],
})
export class FormaMenusComponent implements OnInit, OnDestroy {
  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();
  forma: FormGroup;
  get f() {
    return this.forma.controls;
  }
  modelo: Menus;
  constructor(
    @Inject(MAT_DIALOG_DATA) public registro: Menus,
    private ventana: MatDialogRef<FormaMenusComponent>,
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private refrescaMenu: ActualizaMenuUsuarioService,
  ) {}

  ngOnInit(): void {

    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      codigo: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', Validators.required],
      descripcionIngles: ['', Validators.required],
      icono: ['', Validators.required],
    });

    if (this.registro?.id > 0) {
      Object.assign(this.forma.value, this.registro);
      this.forma.reset(this.forma.value);
    }
  }

  async guardar(): Promise<void> {
    let respuesta: ResultVM<Menus>;
    try {
      if (this.forma.valid) {
        const model = this.forma.value as Menus;
        if (this.registro?.id && this.registro.id !== 0) {
          respuesta = await this.ctx.menu.update(this.registro.id, model);
        } else {
          respuesta = await this.ctx.menu.add(model);
        }
        if (respuesta.isSuccess) {
          this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
          this.guardado.emit();
          this.cerrar();
          this.refrescaMenu.si.next(true);
        }
        else {
          this.alerta.mostrarMensaje(respuesta.message, respuesta.icon as SweetAlertIcon);
        }
      } else {
        this.alerta.mostrarMensaje("Formulario invalido...", "warning");
      }
    } catch (error) {
      this.logger.error(error);
      this.alerta.mostrarMensaje("Error interno del sistema...", "error");
    }
  }

  cerrar(): void {
    this.ventana.close();
  }

  ngOnDestroy(): void {}
}
