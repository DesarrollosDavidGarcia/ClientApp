import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menus } from 'src/app/models/seguridad/menus';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { Observable } from 'rxjs';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Injectable({ providedIn: 'root' })
export class RepositorioMenu extends RepoCatalogo<Menus> {

  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Menus', url);
  }

  obtenerListaMenus(): Observable<ResultVM<Menus[]>> {
    return this.cliente.get<ResultVM<Menus[]>>(this.ruta);
  }


}
