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
import { PantallasPorMenu } from 'src/app/models/seguridad/pantallas-por-menu';
import { ActualizaMenuUsuarioService } from 'src/app/services/actualiza-menu-usuario.service';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { FormaMenusComponent } from '../../menus/forma-menus/forma-menus.component';
import { FormaPantallasComponent } from '../../pantallas/forma-pantallas/forma-pantallas.component';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Component({
  selector: 'app-comp-pantalla-por-menu',
  templateUrl: './comp-pantalla-por-menu.component.html',
  styleUrls: ['./comp-pantalla-por-menu.component.scss'],
})
export class CompPantallaPorMenuComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  @ViewChild(MatSort, { static: false }) ordenador: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;
  tabla: Pantallas[] = [];
  menus: Menus[] = [];
  moduloSeleccionado: number;
  modulosSelect: Menus[] = [];
  forma: FormGroup;
  get f() {
    return this.forma.controls;
  }
  textoBuscar: string = '';
  fuenteDatos: MatTableDataSource<Pantallas> = new MatTableDataSource([]);
  columnasMostradas = [
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
      menuId: [0, Validators.nullValidator],
      menuDescripcion: ['', Validators.required],
    });
    await this.cargarMenus();
  }

  async cargarMenus(): Promise<void> {
    try {
      const respuesta = await this.ctx.menu.getAllActives();
      if (respuesta) {
        this.modulosSelect = respuesta.data;
      }
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  tipoModuloSeleccionado(modulo: Menus): void {
    this.f['menuId'].setValue(modulo.id);
    this.f['menuDescripcion'].setValue(modulo.descripcion);
    this.cargarTabla(modulo.id);
  }

  buscar(event: any) {
    this.textoBuscar = event.target.value;
  }

  async cargarTabla(menuId: number): Promise<void> {
    try {
      this.moduloSeleccionado = menuId;
      this.ctx.pantallaMenus
        .getPantallaModuloAsync(this.moduloSeleccionado)
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

  cambiarEstado(seleccionado: boolean, id: number): void {
    try {
      if (seleccionado) {
        this.asignar(id);
      } else {
        this.noAsignar(id);
      }
      this.refrescaMenu.si.next(true);
    } catch (error) {
      this.logger.error(error);
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
    }
  }

  async asignar(id: number): Promise<void> {
    let respuesta: ResultVM<PantallasPorMenu>;
    try {
      const asignacion = new PantallasPorMenu();
      asignacion.menuId = this.moduloSeleccionado;
      asignacion.pantallaId = id;
      respuesta = await this.ctx.pantallaMenus.asign(asignacion);
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
    let respuesta: ResultVM<PantallasPorMenu>;
    try {
      const asignacion = new PantallasPorMenu();
      asignacion.menuId = this.moduloSeleccionado;
      asignacion.pantallaId = id;
      respuesta = await this.ctx.pantallaMenus
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
    this.forma.get('menuDescripcion').setValue('');
    this.forma.get('menuId').setValue(0);
    this.cargarMenus();
  }

  nuevoRegistro() {
    const forma = this.ventana
      .open(FormaMenusComponent, {
        data: null,
        // width: '650px',
      })
      .afterClosed()
      .subscribe(async (e) => {
        await this.cargarMenus();
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
        let id = this.f['menuId'].value;
        this.cargarTabla(id);
      });
  }

  ngOnDestroy(): void {}
}
