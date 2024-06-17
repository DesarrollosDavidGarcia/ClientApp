
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Paises} from 'src/app/models/catalogos/paises';
import { Estados } from 'src/app/models/catalogos/estados';

@Injectable({ providedIn: 'root' })
export class RepositorioEstados extends RepoCatalogo<Estados> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Estados', url);
  }


}
