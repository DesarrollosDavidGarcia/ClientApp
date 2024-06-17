import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Permisos } from 'src/app/models/seguridad/permisos';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPermisos extends RepoCatalogo<Permisos> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Permisos', url);
  }
}
