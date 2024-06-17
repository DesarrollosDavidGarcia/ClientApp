import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogCliente } from 'src/app/models/errores-internos/error-log-cliente';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioLogCliente extends RepoCatalogo<LogCliente> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'LogsCliente', url);
  }
}
