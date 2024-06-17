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
import { LogServidor } from 'src/app/models/errores-internos/error-log-servidor';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-comp-error-interno-servidor',
  templateUrl: './comp-error-interno-servidor.component.html',
  styleUrls: ['./comp-error-interno-servidor.component.scss'],
})
export class CompErroresInternoServidorComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<LogServidor> = new MatTableDataSource<LogServidor>([]);
  columnasMostradas = [
    'message',
    'messageTemplate',
    'level',
    'timeStamp',
    'exception',
    'properties'
  ];

  constructor(
    public ventana: MatDialog,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
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
      let resultado = await this.ctx.erroresInternosServidor.getAll();
      if (resultado.data.length > 0) {
        this.fuenteDatos = new MatTableDataSource<LogServidor>(resultado.data);
      } else {
        this.fuenteDatos = new MatTableDataSource<LogServidor>([]);
      }
      this.fuenteDatos.paginator = this.paginator;
      this.fuenteDatos.sort = this.sort;
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }


  descargarExcel(): void {}

  ngOnDestroy(): void {}
}
