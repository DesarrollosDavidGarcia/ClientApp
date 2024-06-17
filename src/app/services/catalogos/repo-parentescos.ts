import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Parentescos } from 'src/app/models/catalogos/parentescos';

@Injectable({ providedIn: 'root' })
export class RepositorioParentescos extends RepoCatalogo<Parentescos> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Parentescos', url);
  }


}
