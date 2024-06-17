import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPantalla extends RepoCatalogo<Pantallas> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Pantallas', url);
  }
}
