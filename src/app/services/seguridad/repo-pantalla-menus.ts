import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { PantallasPorMenu } from 'src/app/models/seguridad/pantallas-por-menu';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPantallaMenus extends RepoCatalogo<PantallasPorMenu> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'PantallasPorMenu', url);
  }

  getPantallaModuloAsync(moduloId: number): Observable<ResultVM<Pantallas[]>> {
    const ruta = `${this.ruta}/GetPantallaModuloAsync/${moduloId}`;
    return this.cliente.get<ResultVM<Pantallas[]>>(ruta);
  }

}
