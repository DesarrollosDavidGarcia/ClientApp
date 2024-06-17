import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socios } from 'src/app/models/socios/negocio/negocios';
import { HostService } from '../../host-service.service';
import { RepoCatalogo } from '../../repo-catalogo';


@Injectable({ providedIn: 'root' })
export class RepositorioSocios extends RepoCatalogo<Socios> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Socios', url);
  }
}
