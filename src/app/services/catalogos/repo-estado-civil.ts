import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { EstadoCivil } from 'src/app/models/catalogos/estado-civil';

@Injectable({ providedIn: 'root' })
export class RepositorioEstadoCivil extends RepoCatalogo<EstadoCivil> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'EstadoCivil', url);
  }


}
