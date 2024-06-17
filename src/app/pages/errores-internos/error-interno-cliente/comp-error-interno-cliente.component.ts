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
import { LogCliente } from 'src/app/models/errores-internos/error-log-cliente';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-comp-error-interno-cliente',
  templateUrl: './comp-error-interno-cliente.component.html',
  styleUrls: ['./comp-error-interno-cliente.component.scss'],
})
export class CompErroresInternoClienteComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filtro', { static: false }) filtro: ElementRef;

  fuenteDatos: MatTableDataSource<LogCliente> = new MatTableDataSource<LogCliente>([]);
  columnasMostradas = [
    'entryDate',
    'message',
    'level'
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
      let resultado = await this.ctx.erroresInternosCliente.getAll();
      if (resultado.data.length > 0) {
        this.fuenteDatos = new MatTableDataSource<LogCliente>(resultado.data);
      } else {
        this.fuenteDatos = new MatTableDataSource<LogCliente>([]);
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
