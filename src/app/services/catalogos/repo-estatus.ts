import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Estatus } from 'src/app/models/catalogos/estatus';

@Injectable({ providedIn: 'root' })
export class RepositorioEstatus extends RepoCatalogo<Estatus> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Estatus', url);
  }


}
