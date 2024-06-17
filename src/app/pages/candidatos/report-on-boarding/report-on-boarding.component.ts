import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { Bancos } from 'src/app/models/catalogos/bancos';
import { SeguimientoCandidato } from 'src/app/models/onboarding/candidato';
import { Router } from '@angular/router';
import { ChartComponent } from 'ng-apexcharts';
import { inexpuchartOptions } from 'src/app/dashboards/dashboard-components/income-expenss/income-expenss.component';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-report-on-boarding',
  templateUrl: './report-on-boarding.component.html',
  styleUrls: ['./report-on-boarding.component.scss']
})
export class CompReportOnBordingComponent implements OnInit, OnDestroy {
  @ViewChild('filtro', { static: false }) filtro: ElementRef;
  @ViewChild('chart') chart: ChartComponent = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public inexpuchartOptions: Partial<inexpuchartOptions>;
  fuenteDatos: MatTableDataSource<SeguimientoCandidato> = new MatTableDataSource<SeguimientoCandidato>([]);
  columnasMostradas = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'avance',
    'cantidadDocumentos',
    'fechaProbableIngreso',
    'estatusDescripcion',
    'opciones',
  ];

  totalCandidatos: number = 0;
  enProgreso: number = 0;
  cancelados: number = 0;
  terminados: number = 0;
  constructor(public ventana: MatDialog, private router: Router, public ctx: ContextoService, public alerta: ServicioAlerta, private logger: NGXLogger) {

  }

  async ngOnInit(): Promise<void> {
    await this.tabla();

    this.totalCandidatos = this.fuenteDatos.data.length;
    this.enProgreso = this.fuenteDatos.data.filter(e => e.avance > 0).length;
    this.cancelados = this.fuenteDatos.data.filter(e => e.estatusId == 10).length;
    this.terminados = this.fuenteDatos.data.filter(e => e.avance >= 90 && e.avance <= 100).length;
  }

  ngAfterViewInit() {
    this.fuenteDatos.paginator = this.paginator;
    this.fuenteDatos.sort = this.sort;
  }

  async tabla(): Promise<void> {
    try {
      let resultado = await this.ctx.seguimientoCandidato.obtenerListSeguimientosCandidato();
      if (resultado.data.length > 0) {
        console.dir(resultado.data);
        this.fuenteDatos = new MatTableDataSource<SeguimientoCandidato>(resultado.data);
      } else {
        this.fuenteDatos = new MatTableDataSource<SeguimientoCandidato>([]);
      }
      this.fuenteDatos.paginator = this.paginator;
      this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  candidato(modelo?: SeguimientoCandidato): void {
    if (modelo) {
      this.router.navigateByUrl("/candidatos/onboarding/" + modelo.id + "/" + modelo.correoElectronico);
    }
  }

  filtrar(filterValue: string) {
    this.fuenteDatos.filter = filterValue.trim().toLowerCase();
  }


  limpiarFiltro(): void {
    this.filtro.nativeElement.value = '';
    this.fuenteDatos.filter = '';
  }

  descargarExcel(): void { }

  ngOnDestroy(): void {

  }

  obtenerAvanceColor(porcentaje: number) {
    if (porcentaje < 10) {
      return 'rojo';
    } else if (porcentaje < 40) {
      return 'amarillo';
    } else if (porcentaje < 90) {
      return 'naranja';
    } else {
      return 'verde';
    }
  }


  descargarDocumentoZIP(seguimiento: SeguimientoCandidato) {
    try {
      this.ctx.candidatos.descargarDocumentoZIP(seguimiento.id).toPromise().then((respuesta) => {
        this.llamarZip(respuesta, "Archivo_" + seguimiento.id + "_" + seguimiento.nombre + " " + seguimiento.apellidoPaterno + " " + seguimiento.apellidoMaterno + ".zip");
      }).catch((e) => { console.log(e) });
    } catch (error) {
    }
  }

  llamarZip(respuesta: any, nombreArchivo: any) {
    const blob = new Blob([respuesta], {
      type: 'application/zip',
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

  async cancelarSeguimiento(seguimiento: SeguimientoCandidato) {

    try {
      let resultado = await this.ctx.seguimientoCandidato.cancelarSeguimiento(seguimiento.id);
      this.alerta.mostrarMensaje(resultado.message, resultado.icon as SweetAlertIcon);
      await this.tabla();
    } catch (error) {

    }

  }
}

