import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresas } from 'src/app/models/socios/empresa/empresas';

import { HostService } from '../../host-service.service';
import { RepoCatalogo } from '../../repo-catalogo';
import { ResultVM } from 'src/app/models/utils/resultVM';


@Injectable({ providedIn: 'root' })
export class RepositorioEmpresas extends RepoCatalogo<Empresas> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Empresas', url);
  }

  obtenerListaEmpresasDelSocio(socioId: number): Observable<ResultVM<Empresas[]>> {
    const ruta = `${this.ruta}/ObtenerListaEmpresasSocio/${socioId}`;
    return this.cliente.get<ResultVM<Empresas[]>>(ruta);
  }
}
