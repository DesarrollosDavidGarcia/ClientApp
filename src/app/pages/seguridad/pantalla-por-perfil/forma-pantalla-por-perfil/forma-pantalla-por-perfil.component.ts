import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PantallasPorMenu } from 'src/app/models/seguridad/pantallas-por-menu';
import { ContextoService } from 'src/app/services/contexto.service';

@Component({
  selector: 'app-forma-pantalla-por-perfil',
  templateUrl: './forma-pantalla-por-perfil.component.html',
  styleUrls: ['./forma-pantalla-por-perfil.component.scss'],
})
export class FormaPantallaPorPerfilComponent implements OnInit {
  forma: FormGroup;
  subsGuardar: Subscription;
  guardado: EventEmitter<void> = new EventEmitter<void>();
  get f() {
    return this.forma.controls;
  }
  modelo: PantallasPorMenu;
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: number,
    private ventana: MatDialogRef<FormaPantallaPorPerfilComponent>,
    private formBuilder: FormBuilder,
    private ctx: ContextoService
  ) {}

  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      id: [0, Validators.nullValidator],
      codigo: [0, Validators.nullValidator],
      menuId: ['', Validators.required],
      menuDescripcion: ['', Validators.required],
      pantallaId: ['', Validators.required],
      pantallaDescripcion: ['', Validators.required],
    });
  }

  guardar(): void {}

  cerrar(): void {
    this.ventana.close();
  }

  ngOnDestroy(): void {}
}
