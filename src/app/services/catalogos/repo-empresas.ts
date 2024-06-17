import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Empresas } from 'src/app/models/catalogos/empresas';

@Injectable({ providedIn: 'root' })
export class RepositorioEmpresas extends RepoCatalogo<Empresas> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Empresas', url);
  }


}
