import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { SeguimientoCandidato } from 'src/app/models/onboarding/candidato';

@Injectable({ providedIn: 'root' })
export class RepositorioSeguimientoCandidato extends RepoCatalogo<SeguimientoCandidato> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'SeguimientoCandidato', url);
  }


  async obtenerListSeguimientosCandidato(): Promise<ResultVM<SeguimientoCandidato[]>> {
    const ruta = `${this.ruta}/ObtenerListSeguimientosCandidato`;
    return await this.cliente.get<ResultVM<SeguimientoCandidato[]>>(ruta).toPromise();
  }


  async obtenerSeguimientosCandidatoPorCorreo(correo: string): Promise<ResultVM<SeguimientoCandidato>> {
    const ruta = `${this.ruta}/ObtenerSeguimientosCandidatoPorCorreo/${correo}`;
    return await this.cliente.get<ResultVM<SeguimientoCandidato>>(ruta).toPromise();
  }


  async cancelarSeguimiento(seguimientoId: number): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/CancelarSeguimientoCandidato/${seguimientoId}`;
    return await this.cliente.get<ResultVM<boolean>>(ruta).toPromise();
  }
 
 
}
