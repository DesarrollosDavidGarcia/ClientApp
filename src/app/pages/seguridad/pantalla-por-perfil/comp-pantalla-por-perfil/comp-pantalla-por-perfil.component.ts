import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { flatMap } from 'rxjs/operators';
import { Menus } from 'src/app/models/seguridad/menus';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { PantallasPorPerfil } from 'src/app/models/seguridad/pantallas-por-perfil';

import { Perfiles } from 'src/app/models/seguridad/perfiles';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { FormaMenusComponent } from '../../menus/forma-menus/forma-menus.component';
import { FormaPantallasComponent } from '../../pantallas/forma-pantallas/forma-pantallas.component';
import { FormaPerfilesComponent } from '../../perfiles/forma-perfiles/forma-perfiles.component';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Component({
  selector: 'app-comp-pantalla-por-perfil',
  templateUrl: './comp-pantalla-por-perfil.component.html',
  styleUrls: ['./comp-pantalla-por-perfil.component.scss'],
})
export class CompPantallaPorPerfilComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  @ViewChild(MatSort, { static: false }) ordenador: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;
  tabla: Pantallas[] = [];
  menus: Menus[] = [];
  moduloSeleccionado: number;
  modulosSelect: Perfiles[] = [];
  forma: FormGroup;
  get f() {
    return this.forma.controls;
  }
  textoBuscar: string = '';
  fuenteDatos: MatTableDataSource<Pantallas> = new MatTableDataSource([]);
  columnasMostradas = [
    'codigo',
    'descripcion',
    'descripcionIngles',
    'icono',
    'asignacion',
  ];

  public get diametro(): number {
    if (!this.fuenteDatos || this.fuenteDatos.data.length === 0) {
      return 50;
    }
    return 100;
  }
  constructor(
    public ventana: MatDialog,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private formBuilder: FormBuilder,
    private logger: NGXLogger,
    private refrescaMenu: ActualizaMenuUsuarioService,

  ) {}

  async ngOnInit() {
    this.forma = this.formBuilder.group({
      perfilId: [0, Validators.nullValidator],
      perfilDescripcion: ['', Validators.required],
    });
    await this.cargarPefiles();
  }

  async cargarPefiles(): Promise<void> {
    try {
      const respuesta = await this.ctx.perfiles.getAllActives();
      if (respuesta) {
        this.modulosSelect = respuesta.data;
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  tipoPerfilSeleccionado(modulo: Perfiles): void {
    this.f['perfilId'].setValue(modulo.id);
    this.f['perfilDescripcion'].setValue(modulo.descripcion);
    this.cargarTabla(modulo.id);
  }

  buscar(event: any) {
    this.textoBuscar = event.target.value;
  }

  async cargarTabla(perfilId: number): Promise<void> {
    try {
      this.moduloSeleccionado = perfilId;
      this.ctx.pantallaPerfiles
        .getPantallaPerfilAsync(this.moduloSeleccionado)
        .pipe(
          flatMap((pantallas) => {
            this.tabla = pantallas.data;
            return this.ctx.pantalla.getAll();
          })
        )
        .subscribe((menus) => {
          this.fuenteDatos = new MatTableDataSource(menus.data);
          this.fuenteDatos.paginator = this.paginador;
          this.fuenteDatos.sort = this.ordenador;
          this.menus = menus.data;
        });
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  descargarExcel(): void {
    const fechaActual = new Date();
    const nombreArchivo = 'Pantallas y menus';

    this.ctx.pantallaMenus
      .obtenerExcel()
      .toPromise()
      .then((respuesta) => {
        this.llamarExcel(respuesta, nombreArchivo);
      })
      .catch((e) => {});
  }

  llamarExcel(respuesta: any, nombreArchivo: any) {
    const blob = new Blob([respuesta], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      }),
      url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = nombreArchivo;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  cambiarEstado(seleccionado: boolean, idDireccion: number): void {
    if (seleccionado) {
      this.asignar(idDireccion);
    } else {
      this.noAsignar(idDireccion);
    }
    this.refrescaMenu.si.next(true);

  }

  async asignar(id: number): Promise<void> {
    let respuesta: ResultVM<PantallasPorPerfil>;
    try {
      const asignacion = new PantallasPorPerfil();
      asignacion.perfilId = this.moduloSeleccionado;
      asignacion.pantallaId = id;
      respuesta = await this.ctx.pantallaPerfiles.asign(asignacion);

      this.alerta.mostrarMensaje(
        respuesta.message,
        respuesta.icon as SweetAlertIcon
      );
    } catch (error) {
      this.logger.error(error);
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
    }
  }

  async noAsignar(id: number): Promise<void> {
    let respuesta: ResultVM<PantallasPorPerfil>;
    try {
      const asignacion = new PantallasPorPerfil();
      asignacion.perfilId = this.moduloSeleccionado;
      asignacion.pantallaId = id;
      respuesta = await this.ctx.pantallaPerfiles
        .notAsign(asignacion);
      this.alerta.mostrarMensaje(
        respuesta.message,
        respuesta.icon as SweetAlertIcon
      );
    } catch (error) {
      this.logger.error(error);
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
    }
  }

  modoAsignada(id: number): boolean {
    const direccion = this.tabla.find((d) => d.id === id);
    if (direccion) {
      return true;
    } else {
      return false;
    }
  }
  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }
  limpiarFiltro(): void {
    this.filtro.nativeElement.value = '';
    this.fuenteDatos.filter = '';
  }

  limpiarSeleccion(): void {
    this.forma.get('perfilDescripcion').setValue('');
    this.forma.get('perfilId').setValue(0);
    this.cargarPefiles();
  }

  nuevoRegistro() {
    const forma = this.ventana
      .open(FormaPerfilesComponent, {
        data: null,
        // width: '650px',
      })
      .afterClosed()
      .subscribe(async (e) => {
        await this.cargarPefiles();
      });
  }

  nuevoRegistro2() {
    const forma = this.ventana
      .open(FormaPantallasComponent, {
        data: null,
        // width: '650px',
      })
      .afterClosed()
      .subscribe(async (e) => {
        let id = this.f['perfilId'].value;
        this.cargarTabla(id);
      });
  }

  ngOnDestroy(): void {}
}
