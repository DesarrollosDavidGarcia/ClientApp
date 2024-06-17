
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Paises} from 'src/app/models/catalogos/paises';

@Injectable({ providedIn: 'root' })
export class RepositorioPaises extends RepoCatalogo<Paises> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Paises', url);
  }


}
