import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { GradoEscolaridad } from 'src/app/models/catalogos/grado-escolaridad';

@Injectable({ providedIn: 'root' })
export class RepositorioGradoEscolaridad extends RepoCatalogo<GradoEscolaridad> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'GradoEscolaridad', url);
  }


}
