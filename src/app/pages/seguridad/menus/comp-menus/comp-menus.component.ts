import {
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
import { Subscription } from 'rxjs';
import { Menus } from 'src/app/models/seguridad/menus';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { FormaMensajeBasicoComponent } from 'src/app/pages/utileria/mensaje-basico/forma-mensaje-basico/forma-mensaje-basico.component';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { FormaMenusComponent } from '../forma-menus/forma-menus.component';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Component({
  selector: 'app-comp-menus',
  templateUrl: './comp-menus.component.html',
  styleUrls: ['./comp-menus.component.scss'],
})
export class CompMenusComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;
  private sub = new Subscription();
  actualizaTabla: boolean = true;
  fuenteDatos: MatTableDataSource<Menus> = new MatTableDataSource<Menus>([]);
  columnasMostradas = [
    'codigo',
    'descripcion',
    'descripcionIngles',
    'icono',
    'activo',
    'opciones',
  ];

  constructor(
    public ventana: MatDialog,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,

  ) {

  }

  async ngOnInit(): Promise<void> {
    // this.ctx.menu.ConexiontHubMenu();
    this.ctx.menu.cambio.subscribe(async (resultado) => {
      if (resultado) {
        await this.tabla();
      }
    });
    await this.tabla();
  }

  async ngAfterViewInit() {
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
  }

  async tabla(): Promise<void> {
    try {
        let resultado = await this.ctx.menu.obtenerListaMenus().toPromise();
        if (resultado.data.length > 0) {
          this.fuenteDatos = new MatTableDataSource<Menus>(resultado.data);
        } else {
          this.fuenteDatos = new MatTableDataSource<Menus>([]);
        }

        this.fuenteDatos.paginator = this.paginator;
        this.fuenteDatos.sort = this.sort;

    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(modelo?: Menus): void {
    let dato = modelo?.id ? modelo : null;
    let forma = this.ventana.open(FormaMenusComponent, {
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

  cambiarEstado(activo: boolean, modelo: Menus): void {
    if (activo) {
      this.activar(modelo);
    } else {
      this.desactivar(modelo);
    }
  }

  async activar(modelo: Menus): Promise<void> {
    try {
      let resultado = await this.ctx.menu
        .active(modelo.id, modelo);
      if (resultado.isSuccess && resultado.message === 'Activado') {
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

  async desactivar(modelo: Menus): Promise<void> {
    try {
      let resultado = await this.ctx.menu
        .inactive(modelo.id, modelo);
      if (resultado.isSuccess && resultado.message === 'Desactivar') {
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

  async eliminar(modelo: Menus): Promise<void> {
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
            let resultado = await this.ctx.menu.delete(modelo.id);
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
