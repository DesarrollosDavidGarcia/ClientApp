import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { PantallasPorPerfil } from 'src/app/models/seguridad/pantallas-por-perfil';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPantallaPerfiles extends RepoCatalogo<PantallasPorPerfil> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'PantallasPorPerfiles', url);
  }



  getPantallaPerfilAsync(moduloId: number): Observable<ResultVM<Pantallas[]>> {
    const ruta = `${this.ruta}/GetPantallaPerfilAsync/${moduloId}`;
    return this.cliente.get<ResultVM<Pantallas[]>>(ruta);
  }


}
