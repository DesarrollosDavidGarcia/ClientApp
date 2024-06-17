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
import { RelacionParental } from 'src/app/models/catalogos/relacion-parental';
import { FormaRelacionParentalComponent } from '../forma-relacion-parental/forma-relacion-parental.component';
import { UrlEnpoint } from 'src/app/models/utils/url-enpoint';


@Component({
  selector: 'app-comp-relacion-parental',
  templateUrl: './comp-relacion-parental.component.html',
  styleUrls: ['./comp-relacion-parental.component.scss']
})
export class CompRelacionParentalComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<RelacionParental> = new MatTableDataSource<RelacionParental>([]);
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
      let resultado = await this.ctx.relacionParental.getAll();
    if (resultado.data.length > 0) {
      this.fuenteDatos = new MatTableDataSource<RelacionParental>(resultado.data);
    }else{
      this.fuenteDatos = new MatTableDataSource<RelacionParental>([]);
    }
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(modelo?: RelacionParental): void {
    let dato = modelo?.id ? modelo : null;
    let forma = this.ventana.open(FormaRelacionParentalComponent, { data: dato, panelClass: 'form-container' });
    forma.componentInstance.guardado.subscribe(() => { this.tabla(); });
  }

  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }
  cambiarEstado(activo: boolean, modelo: RelacionParental): void {
    if (activo) {
      this.activar(modelo);
    } else {
      this.desactivar(modelo);
    }
  }

  async activar(modelo: RelacionParental): Promise<void> {
    try {
      let resultado = await this.ctx.relacionParental.active(modelo.id, modelo);
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

  async desactivar(modelo: RelacionParental): Promise<void> {
    try {
      let resultado = await this.ctx.relacionParental
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
  async eliminar(modelo: RelacionParental): Promise<void> {
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
          let resultado = await this.ctx.relacionParental.delete(modelo.id);
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
      model.path = "CatalogosSAC/ObtenerRelacionParentalAsync";
      let respuestaSAC = await this.ctx.relacionParental.getAllSAC(model);
      if (respuestaSAC.isSuccess) {
        let respuesta = await this.ctx.relacionParental.addList(respuestaSAC.data);
        if (respuesta.isSuccess) {
          await this.tabla();
        }
      } else {
      }
    } catch (error) {
    }
  }
}

