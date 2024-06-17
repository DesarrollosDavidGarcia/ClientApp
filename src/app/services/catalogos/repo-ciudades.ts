
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Ciudades } from 'src/app/models/catalogos/ciudad';

@Injectable({ providedIn: 'root' })
export class RepositorioCiudades extends RepoCatalogo<Ciudades> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Ciudades', url);
  }


}
