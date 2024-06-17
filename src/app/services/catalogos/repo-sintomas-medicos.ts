import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { SintomasMedicos } from 'src/app/models/catalogos/sintomas-medicos';

@Injectable({ providedIn: 'root' })
export class RepositorioSintomasMedicos extends RepoCatalogo<SintomasMedicos> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'SintomasMedicos', url);
  }


}
