import { Component, OnInit, EventEmitter, Inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CategoriaDocumentos } from 'src/app/models/catalogos/categoria-documentos';
import { Menus } from 'src/app/models/seguridad/menus';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-forma-categoria-documentos',
  templateUrl: './forma-categoria-documentos.component.html',
  styleUrls: ['./forma-categoria-documentos.component.scss']
})
export class FormaCategoriaDocumentosComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();
  get f() {
    return this.forma.controls;
  }
  modelo: Menus;
  constructor(
    @Inject(MAT_DIALOG_DATA) public registro: CategoriaDocumentos,
    private ventana: MatDialogRef<FormaCategoriaDocumentosComponent>,
    private formBuilder: FormBuilder,
    private ctx: ContextoService,
    private alerta: ServicioAlerta
  ) { }

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      esHabilitado: [false, Validators.nullValidator],
      esAlta: [false, Validators.nullValidator],
      esFirmado: [false, Validators.nullValidator],
      esRequerido: [false, Validators.nullValidator],
      orden: [0, Validators.required],
      extension: ['', Validators.required],
      temporalId:  [0, Validators.required],


    });

    if (this.registro?.id > 0) {
     
      Object.assign(this.forma.value, this.registro);
      this.forma.reset(this.forma.value);
    }
  }
  async guardar(): Promise<void> {
   
    let respuesta: ResultVM<CategoriaDocumentos>;
    try {
      if (this.forma.valid) {
        const model = this.forma.value as CategoriaDocumentos;

        if (this.registro?.id && this.registro.id !== 0) {
          respuesta = await this.ctx.categoriaDocumentos.update(this.registro.id, model);
        } else {
          respuesta = await this.ctx.categoriaDocumentos.add(model);
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

  ngOnDestroy(): void { }

  habilitarCampoEsHabilitado(event: any) {
    this.f["esHabilitado"].setValue(event.checked);
  }

  habilitarCampoEsAlta(event: any) {

    this.f["esAlta"].setValue(event.checked);
  }

  habilitarCampoEsFirmado(event: any) {
    this.f["esFirmado"].setValue(event.checked);
  }

  habilitarCampoEsRequerido(event: any) {
    this.f["esRequerido"].setValue(event.checked);
  }
}
