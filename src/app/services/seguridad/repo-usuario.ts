import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from 'src/app/models/seguridad/usuarios';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { ResultVM } from 'src/app/models/utils/resultVM';

@Injectable({ providedIn: 'root' })
export class RepositorioUsuarios extends RepoCatalogo<Usuarios> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Usuarios', url);
  }


  async addUserWithPhotoAsync(model: Usuarios): Promise<ResultVM<Usuarios>> {
    const ruta = `${this.ruta}/AddUserWithPhotoAsync`;
    return this.cliente.post<ResultVM<Usuarios>>(ruta, model).toPromise();
  }


  async updateUserWithPhotoAsync(id:number, model: Usuarios): Promise<ResultVM<Usuarios>> {

    const ruta = this.ruta + '/UpdateUserWithPhotoAsync/' + id;
    return await this.cliente.put<ResultVM<Usuarios>>(ruta, model).toPromise();
  }


  async getListUserWithPerfilPhoto(): Promise<ResultVM<Usuarios[]>> {
    const ruta = `${this.ruta}/GetListUserWithPerfilPhoto`;
    return this.cliente.get<ResultVM<Usuarios[]>>(ruta).toPromise();
  }

  async getUserWithPerfilPhoto(id: number): Promise<ResultVM<Usuarios>> {
    const ruta = this.ruta + '/GetUserWithPerfilPhoto/' + id;
    return this.cliente.get<ResultVM<Usuarios>>(ruta).toPromise();
  }

}
