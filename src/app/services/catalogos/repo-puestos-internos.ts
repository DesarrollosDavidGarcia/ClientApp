import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { PuestoInterno } from 'src/app/models/catalogos/puesto-interno';

@Injectable({ providedIn: 'root' })
export class RepositorioPuestosInternos extends RepoCatalogo<PuestoInterno> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'PuestosInternos', url);
  }


}
