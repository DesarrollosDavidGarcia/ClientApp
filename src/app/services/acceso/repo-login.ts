import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registro } from 'src/app/models/registro/registro';
import { Credencial } from 'src/app/models/seguridad/credencial';
import { Login } from 'src/app/models/seguridad/login';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioLogin extends RepoCatalogo<Credencial> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Auth', url);
  }

  async signIn(registro: Login): Promise<ResultVM<Credencial>> {
    const ruta = `${this.ruta}/SignIn`;
    return this.cliente.post<ResultVM<Credencial>>(ruta, registro).toPromise();
  }


  async refreshSessionMenuUser(codigo: string): Promise<ResultVM<Credencial>> {
    const ruta = `${this.ruta}/RefreshSessionMenuUser/${codigo}`;
    return this.cliente.get<ResultVM<Credencial>>(ruta).toPromise();
  }


}
