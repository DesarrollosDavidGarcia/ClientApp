import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { FormaMensajeBasicoComponent } from 'src/app/pages/utileria/mensaje-basico/forma-mensaje-basico/forma-mensaje-basico.component';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { UrlEnpoint } from 'src/app/models/utils/url-enpoint';
import { PuestoInterno } from 'src/app/models/catalogos/puesto-interno';
import { FormaPuestosInternosComponent } from '../forma-puestos-internos/forma-puestos-internos.component';


@Component({
  selector: 'app-comp-puestos-internos',
  templateUrl: './comp-puestos-internos.component.html',
  styleUrls: ['./comp-puestos-internos.component.scss']
})
export class CompPuestosInternosComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<PuestoInterno> = new MatTableDataSource<PuestoInterno>([]);
  columnasMostradas = [
    'codigo',
    'descripcion',
    'activo',
    'opciones',
  ];

  constructor(public ventana: MatDialog, public ctx: ContextoService, public alerta: ServicioAlerta, private logger: NGXLogger) {}

  async ngOnInit(): Promise<void> {
    await this.tabla();
  }

  ngAfterViewInit() {
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
  }

  async tabla(): Promise<void> {
    try {
      let resultado = await this.ctx.puestosInternos.getAll();
    if (resultado.data.length > 0) {
      this.fuenteDatos = new MatTableDataSource<PuestoInterno>(resultado.data);
    }else{
      this.fuenteDatos = new MatTableDataSource<PuestoInterno>([]);
    }
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(modelo?: PuestoInterno): void {
    let dato = modelo?.id ? modelo : null;
    let forma = this.ventana.open(FormaPuestosInternosComponent, { data: dato, panelClass: 'form-container' });
    forma.componentInstance.guardado.subscribe(() => { this.tabla(); });
  }

  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }
  cambiarEstado(activo: boolean, modelo: PuestoInterno): void {
    if (activo) {
      this.activar(modelo);
    } else {
      this.desactivar(modelo);
    }
  }

  async activar(modelo: PuestoInterno): Promise<void> {
    try {
      let resultado = await this.ctx.puestosInternos.active(modelo.id, modelo);
      if (resultado.isSuccess && resultado.message === 'Activado') {
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      } else {
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }

  }

  async desactivar(modelo: PuestoInterno): Promise<void> {
    try {
      let resultado = await this.ctx.puestosInternos
      .inactive(modelo.id, modelo);
    if (resultado.isSuccess && resultado.message === 'Desactivar') {
      this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
    } else {
      this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
    }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }

  }
  async eliminar(modelo: PuestoInterno): Promise<void> {
    let mensaje: ResultVM<Mensaje> = new ResultVM<Mensaje>();
    mensaje.isSuccess = false;
    mensaje.message = "¿Desea eliminar el siguiente registro? \n" + modelo.codigo + " - " + modelo.descripcion  + " ";
    try {
      let forma = this.ventana.open(FormaMensajeBasicoComponent, {
        data: mensaje,
        panelClass: 'form-container',
      });
      forma.componentInstance.guardado.subscribe(async (respuesta: ResultVM<Mensaje>) => {
        if(respuesta.isSuccess)
        {
          let resultado = await this.ctx.puestosInternos.delete(modelo.id);
          if (resultado.isSuccess) {
            this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
            await this.tabla();
          } else {
            this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
          }
        }
      });
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

  ngOnDestroy(): void {

  }

  async importar() {
    try {
      let model: UrlEnpoint = new UrlEnpoint();
      model.path = "CatalogosSAC/ObtenerPuestosInternosAsync";
      let respuestaSAC = await this.ctx.puestosInternos.getAllSAC(model);
      if (respuestaSAC.isSuccess) {
        
        console.dir(respuestaSAC.data);
        let respuesta = await this.ctx.puestosInternos.addList(respuestaSAC.data);
        if (respuesta.isSuccess) {
          await this.tabla();
        }
      } else {
      }
    } catch (error) {
    }
  }
}

