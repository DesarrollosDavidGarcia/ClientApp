import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Bancos } from 'src/app/models/catalogos/bancos';

@Injectable({ providedIn: 'root' })
export class RepositorioBancos extends RepoCatalogo<Bancos> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Bancos', url);
  }


}
