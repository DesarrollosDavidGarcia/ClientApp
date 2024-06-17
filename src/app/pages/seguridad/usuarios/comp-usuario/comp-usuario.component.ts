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
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Menus } from 'src/app/models/seguridad/menus';
import { Usuarios } from 'src/app/models/seguridad/usuarios';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import 'animate.css';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { FormaMensajeBasicoComponent } from 'src/app/pages/utileria/mensaje-basico/forma-mensaje-basico/forma-mensaje-basico.component';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { UrlEnpoint } from 'src/app/models/utils/url-enpoint';
@Component({
  selector: 'app-comp-usuario',
  templateUrl: './comp-usuario.component.html',
  styleUrls: ['./comp-usuario.component.scss'],
})
export class CompUsuarioComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<Usuarios> = new MatTableDataSource<Usuarios>(
    []
  );
  columnasMostradas = [
    'foto',
    'codigo',
    'nombres',
    'apellidoPaterno',
    'apellidoMaterno',
    'activo',
    'opciones',
  ];

  constructor(
    public ventana: MatDialog,
    private router: Router,
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
      let resultado = await this.ctx.usuarios.getListUserWithPerfilPhoto();
      if (resultado.data.length > 0) {
        this.fuenteDatos = new MatTableDataSource<Usuarios>(resultado.data);
      } else {
        this.fuenteDatos = new MatTableDataSource<Usuarios>([]);
      }
      this.fuenteDatos.paginator = this.paginator;
      this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(id?: string): void {
    const dato = id ? id : 0;
    this.router.navigate(['/seguridad/usuarios/forma-usuario/', dato]);
  }

  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }

  cambiarEstado(activo: boolean, modelo: Usuarios): void {
    if (activo) {
      this.activar(modelo);
    } else {
      this.desactivar(modelo);
    }
  }

  async activar(modelo: Usuarios): Promise<void> {
    try {
      let resultado = await this.ctx.usuarios
        .active(modelo.id, modelo);
      if (resultado.isSuccess) {
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      } else {
        this.logger.error(resultado.message);
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  async desactivar(modelo: Usuarios): Promise<void> {
    try {
      let resultado = await this.ctx.usuarios
        .inactive(modelo.id, modelo);
      if (resultado.isSuccess ) {
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      } else {
        this.logger.error(resultado.message);
        this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  async eliminar(modelo: Usuarios): Promise<void> {
    let mensaje: ResultVM<Mensaje> = new ResultVM<Mensaje>();
    mensaje.isSuccess = false;
    mensaje.message = "¿Desea eliminar el siguiente registro? \n" + modelo.codigo + " - " + modelo.nombre  + " ";
    try {
      let forma = this.ventana.open(FormaMensajeBasicoComponent, {
        data: mensaje,
        panelClass: 'form-container',
      });
      forma.componentInstance.guardado.subscribe(async (respuesta: ResultVM<Mensaje>) => {
        if(respuesta.isSuccess)
        {
          let resultado = await this.ctx.usuarios.delete(modelo.id);
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

  ngOnDestroy(): void {}

  async importar() {
    try {
      
      let model: UrlEnpoint = new UrlEnpoint();
      model.path = "CatalogosSAC/ObtenerUsuariosAsync";
      let respuestaSAC = await this.ctx.usuarios.getAllSAC(model);
      if (respuestaSAC.isSuccess) {
        let respuesta = await this.ctx.usuarios.addList(respuestaSAC.data);
        if (respuesta.isSuccess) {
          await this.tabla();
        }
      } else {
      }
    } catch (error) {
    }
  }
}
