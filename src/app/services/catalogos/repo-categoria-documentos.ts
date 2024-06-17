import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { CategoriaDocumentos } from 'src/app/models/catalogos/categoria-documentos';

@Injectable({ providedIn: 'root' })
export class RepositorioCategoriaDocumentos extends RepoCatalogo<CategoriaDocumentos> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'CategoriaDocumento', url);
  }
}
