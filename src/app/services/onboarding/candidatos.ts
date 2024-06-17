import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { HostService } from '../host-service.service';
import { RepoCatalogo } from '../repo-catalogo';
import { DatosCandidatos } from 'src/app/models/onboarding/datos-candidatos';
import { DatosBasicos, DireccionActual, DireccionFiscal, General, Habitos, SeguimientoCandidato } from 'src/app/models/onboarding/candidato';
import { Familiar } from 'src/app/models/onboarding/familiares';
import { Contactos } from 'src/app/models/onboarding/contactos';
import { HistorialClinicoPersonal } from 'src/app/models/onboarding/enfermedades-personales';
import { HistorialClinicoFamiliar } from 'src/app/models/onboarding/enfermedades-familiares';
import { SintomasCandidato } from 'src/app/models/onboarding/sintomas-candidatos';
import { DocumentacionCandidato } from 'src/app/models/catalogos/documentacion-colaborador';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class RepositorioCandidatos extends RepoCatalogo<DatosCandidatos> {
  constructor(cliente: HttpClient, url: HostService) {
    super(cliente, 'Candidatos', url);
  }


  async precargaDatos(): Promise<ResultVM<DatosCandidatos>> {
    const ruta = `${this.ruta}/PrecargaDatosAsync`;
    return await this.cliente.get<ResultVM<DatosCandidatos>>(ruta).toPromise();
  }

  async obtenerCandidatoPorCorreo(seguimientoId: number, correo: string): Promise<ResultVM<SeguimientoCandidato>> {
    const ruta = `${this.ruta}/ObtenerCandidatoPorCorreoAsync/${seguimientoId}/${correo}`;
    return await this.cliente.get<ResultVM<SeguimientoCandidato>>(ruta).toPromise();
  }


  async guardarDatosBasicosCandidato(seguimientoId: number, model: DatosBasicos): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosBasicosCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosDireccionActualCandidato(seguimientoId: number, model: DireccionActual): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDireccionActualCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosDireccionFiscalCandidato(seguimientoId: number, model: DireccionFiscal): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDireccionFiscalCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarFamiliaresCandidato(seguimientoId: number, model: Familiar[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarFamiliaresCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarContactosCandidato(seguimientoId: number, model: Contactos[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarContactosCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosGeneralesCandidato(seguimientoId: number, model: General): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosGeneralesCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosHabitosCandidato(seguimientoId: number, model: Habitos): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosHabitosCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosHistorialClinicoFamiliarCandidato(seguimientoId: number, model: HistorialClinicoFamiliar[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosHistorialClinicoFamiliarCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosHistorialClinicoPersonalCandidato(seguimientoId: number, model: HistorialClinicoPersonal[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosHistorialClinicoPersonalCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDatosSintomasCandidato(seguimientoId: number, model: SintomasCandidato[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDatosSintomasCandidato/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async guardarDocumentosCandidato(seguimientoId: number, model: DocumentacionCandidato): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/GuardarDocumentos/${seguimientoId}`;
    return await this.cliente.put<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async descargarDocumento(documentoId: number, seguimientoId: number): Promise<ResultVM<string>> {
    const ruta = `${this.ruta}/DescargarDocumentoPorSeguimiento/${documentoId}/${seguimientoId}`;
    return await this.cliente.get<ResultVM<string>>(ruta).toPromise();
  }

   descargarDocumentoZIP(seguimientoId: number): Observable<Blob> {
    const ruta = `${this.ruta}/DescargarArchivoZip/${seguimientoId}`;
    
    return this.cliente.get(ruta, {
      responseType: 'blob' as 'blob'
    }).pipe(map((res: Blob)=>{
      return res;
    }))
  }

  async eliminarDocumentoPorSeguimiento(documentoId: number, seguimientoId: number): Promise<ResultVM<string>> {
    const ruta = `${this.ruta}/EliminarDocumentoPorSeguimiento/${documentoId}/${seguimientoId}`;
    return await this.cliente.delete<ResultVM<string>>(ruta).toPromise();
  }
}
