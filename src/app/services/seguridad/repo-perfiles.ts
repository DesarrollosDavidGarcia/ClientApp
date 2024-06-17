import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Perfiles } from 'src/app/models/seguridad/perfiles';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPerfiles extends RepoCatalogo<Perfiles> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Perfiles', url);
  }
}
