import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from 'src/app/models/registro/registro';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioRegistro extends RepoCatalogo<Registro> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Registro', url);
  }

  usuarioRegistro(registro: Registro): Observable<ResultVM<Registro>> {
    const ruta = `${this.ruta}/UsuarioRegistro`;
    return this.cliente.post<ResultVM<Registro>>(ruta, registro);
  }


}
