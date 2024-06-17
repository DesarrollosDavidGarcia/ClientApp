import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { FormaMensajeBasicoComponent } from 'src/app/pages/utileria/mensaje-basico/forma-mensaje-basico/forma-mensaje-basico.component';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { FormaPantallasComponent } from '../forma-pantallas/forma-pantallas.component';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Component({
  selector: 'app-comp-pantallas',
  templateUrl: './comp-pantallas.component.html',
  styleUrls: ['./comp-pantallas.component.scss'],
})
export class CompPantallasComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<Pantallas> =
    new MatTableDataSource<Pantallas>([]);
  columnasMostradas = [
    'codigo',
    'descripcion',
    'descripcionIngles',
    'icono',
    'url',
    'tipo',
    'orden',
    'activo',
    'opciones',
  ];

  constructor(
    public ventana: MatDialog,
    public ctx: ContextoService,
    public alerta: ServicioAlerta,
    private logger: NGXLogger
  ) {}

  async ngOnInit(): Promise<void> {
    await this.tabla();
  }

  ngAfterViewInit() {
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
  }

  async tabla(): Promise<void> {
    try {
      let resultado = await this.ctx.pantalla.getAll();
      if (resultado.data.length > 0) {
        this.fuenteDatos = new MatTableDataSource<Pantallas>(resultado.data);
      } else {
        this.fuenteDatos = new MatTableDataSource<Pantallas>([]);
      }
      this.fuenteDatos.paginator = this.paginator;
      this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(modelo?: Pantallas): void {
    let dato = modelo?.id ? modelo : null;
    let forma = this.ventana.open(FormaPantallasComponent, {
      data: dato,
      panelClass: 'form-container',
    });
    forma.componentInstance.guardado.subscribe(() => {
      this.tabla();
    });
  }

  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }

  cambiarEstado(activo: boolean, modelo: Pantallas): void {
    if (activo) {
      this.activar(modelo);
    } else {
      this.desactivar(modelo);
    }
  }

  async activar(modelo: Pantallas): Promise<void> {
    try {
      let resultado = await this.ctx.pantalla
        .active(modelo.id, modelo);
      if (resultado.isSuccess) {
        this.alerta.mostrarMensaje(
          resultado.message,
          resultado.icon as SweetAlertIcon
        );
      } else {
        this.alerta.mostrarMensaje(
          resultado.message,
          resultado.icon as SweetAlertIcon
        );
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  async desactivar(modelo: Pantallas): Promise<void> {
    try {
      let resultado = await this.ctx.pantalla
        .inactive(modelo.id, modelo);
      if (resultado.isSuccess) {
        this.alerta.mostrarMensaje(
          resultado.message,
          resultado.icon as SweetAlertIcon
        );
      } else {
        this.alerta.mostrarMensaje(
          resultado.message,
          resultado.icon as SweetAlertIcon
        );
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }
  async eliminar(modelo: Pantallas): Promise<void> {
    let mensaje: ResultVM<Mensaje> = new ResultVM<Mensaje>();
    mensaje.isSuccess = false;
    mensaje.message =
      '¿Desea eliminar el siguiente registro? \n' +
      modelo.codigo +
      ' - ' +
      modelo.descripcion +
      ' ';
    try {
      let forma = this.ventana.open(FormaMensajeBasicoComponent, {
        data: mensaje,
        panelClass: 'form-container',
      });
      forma.componentInstance.guardado.subscribe(
        async (respuesta: ResultVM<Mensaje>) => {
          if (respuesta.isSuccess) {
            let resultado = await this.ctx.pantalla
              .delete(modelo.id);
            if (resultado.isSuccess) {
              this.alerta.mostrarMensaje(
                resultado.message,
                resultado.icon as SweetAlertIcon
              );
              await this.tabla();
            } else {
              this.alerta.mostrarMensaje(
                resultado.message,
                resultado.icon as SweetAlertIcon
              );
            }
          }
        }
      );
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  limpiarFiltro(): void {
    this.filtro.nativeElement.value = '';
    this.fuenteDatos.filter = '';
  }

  descargarExcel(): void {}

  ngOnDestroy(): void {}
}
