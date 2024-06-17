import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pantallas } from 'src/app/models/seguridad/pantallas';
import { Permisos } from 'src/app/models/seguridad/permisos';
import { PermisosPorPerfil } from 'src/app/models/seguridad/permisos-por-perfil';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';

@Injectable({ providedIn: 'root' })
export class RepositorioPermisosPerfiles extends RepoCatalogo<PermisosPorPerfil> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'PermisosPorPerfil', url);
  }

  obtenerPermisoPerfil(perfilId: number): Observable<ResultVM<Permisos[]>> {
    const ruta = `${this.ruta}/ObtenerPermisosPerfil/${perfilId}`;
    return this.cliente.get<ResultVM<Permisos[]>>(ruta);
  }
  // asignar(modelo: PermisosPorPerfil): Observable<ResultVM<PermisosPorPerfil>> {
  //   const ruta = `${this.ruta}/Asignar`;
  //   return this.cliente.post<ResultVM<PermisosPorPerfil>>(ruta, modelo);
  // }

  // noAsignar(modelo: PermisosPorPerfil): Observable<ResultVM<PermisosPorPerfil>> {
  //   const ruta = `${this.ruta}/NoAsignar`;
  //   return this.cliente.post<ResultVM<PermisosPorPerfil>>(ruta, modelo);
  // }
}
