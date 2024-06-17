import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Component({
  selector: 'app-forma-mensaje-basico',
  templateUrl: './forma-mensaje-basico.component.html',
  styleUrls: ['./forma-mensaje-basico.component.scss'],
})
export class FormaMensajeBasicoComponent implements OnInit {
  forma: FormGroup;
  subsGuardar: Subscription;
  guardado: EventEmitter<ResultVM<Mensaje>> = new EventEmitter<ResultVM<Mensaje>>();
  get f() {
    return this.forma.controls;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public result: ResultVM<Mensaje>,
    private ventana: MatDialogRef<FormaMensajeBasicoComponent>,
  ) {}

  ngOnInit(): void {

  }

  async guardar(): Promise<void> {
    let mensajeResultVM: ResultVM<Mensaje> = new ResultVM<Mensaje>();
    mensajeResultVM.isSuccess = true
    this.guardado.emit(mensajeResultVM);
    this.ventana.close();
  }

  cerrar(): void {
    let mensajeResultVM: ResultVM<Mensaje> = new ResultVM<Mensaje>();
    mensajeResultVM.isSuccess = false;
    this.guardado.emit(mensajeResultVM);
    this.ventana.close();
  }

  ngOnDestroy(): void {}
}
