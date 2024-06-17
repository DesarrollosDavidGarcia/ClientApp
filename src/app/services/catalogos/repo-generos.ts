import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Generos } from 'src/app/models/catalogos/generos';

@Injectable({ providedIn: 'root' })
export class RepositorioGeneros extends RepoCatalogo<Generos> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Generos', url);
  }


}
