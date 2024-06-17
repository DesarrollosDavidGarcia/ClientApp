import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { RelacionParental } from 'src/app/models/catalogos/relacion-parental';

@Injectable({ providedIn: 'root' })
export class RepositorioRelacionParental extends RepoCatalogo<RelacionParental> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'RelacionParental', url);
  }


}
