import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credencial } from 'src/app/models/seguridad/credencial';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioSalida extends RepoCatalogo<Credencial> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Auth', url);
  }

  cerrarSesion(credencial: Credencial): Observable<ResultVM<Credencial>> {
    const ruta = `${this.ruta}/LogOut`;
    return this.cliente.post<ResultVM<Credencial>>(ruta, credencial);
  }


}
