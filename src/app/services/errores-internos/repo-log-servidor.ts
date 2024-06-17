import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogServidor } from 'src/app/models/errores-internos/error-log-servidor';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioLogServidor extends RepoCatalogo<LogServidor> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'LogsServidor', url);
  }
}
