import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  ResultVM } from '../models/utils/resultVM';
import { RepoBase } from './repo-base';
import { HostService } from './host-service.service';
import { UrlEnpoint } from '../models/utils/url-enpoint';


export abstract class RepoCatalogo<T> extends RepoBase<T> {
  // private hubconexion: signalR.HubConnection;
  public cambio = new BehaviorSubject<boolean>(false);
  private referencia: string;

  constructor(http: HttpClient, controlador: string, url: HostService) {
    super(http, controlador);
    this.referencia = url.getHostname();
  }
  async getById(id: number): Promise<ResultVM<T>> {
    return await this.cliente.get<ResultVM<T>>(`${this.ruta}/GetByIdAsync/${id}`).toPromise();
  }

  async getAll(): Promise<ResultVM<T[]>> {
    return await this.cliente.get<ResultVM<T[]>>(this.ruta).toPromise();
  }

  async getAllSAC(urlendpoint: UrlEnpoint): Promise<ResultVM<T[]>> {
    const ruta = `${this.ruta}/ImportFromSACAsync`;
    return await this.cliente.post<ResultVM<T[]>>(ruta, urlendpoint).toPromise();
  }

  async getAllActives(): Promise<ResultVM<T[]>> {
    return await this.cliente.get<ResultVM<T[]>>(this.ruta).toPromise();
  }

  async getAllInactives(): Promise<ResultVM<T[]>> {
    return await this.cliente.get<ResultVM<T[]>>(this.ruta).toPromise();
  }

  async add(model: T): Promise<ResultVM<T>> {
    return await
      this.cliente.post<ResultVM<T>>(this.ruta, model).toPromise();
  }


  async addList(model: T[]): Promise<ResultVM<boolean>> {
    const ruta = `${this.ruta}/AddList`;
    return await this.cliente.post<ResultVM<boolean>>(ruta, model).toPromise();
  }

  async update(id: number, model: T): Promise<ResultVM<T>> {
    const ruta = this.ruta + '/' + id;
    return await this.cliente.put<ResultVM<T>>(ruta, model).toPromise();
  }

  async delete(id: number): Promise<ResultVM<T>> {
    const ruta = this.ruta + '/' + id;
    return await this.cliente.delete<ResultVM<T>>(ruta).toPromise();
  }

  async active(id: number, model: T): Promise<ResultVM<T>> {
    const ruta = `${this.ruta}/Activate/${id}`;
    return await this.cliente.put<ResultVM<T>>(ruta, model).toPromise();
  }

  async inactive(id: number, model: T): Promise<ResultVM<T>> {
    const ruta = `${this.ruta}/InActivate/${id}`;
    return await this.cliente.put<ResultVM<T>>(ruta, model).toPromise();
  }


  async asign(modelo: T): Promise<ResultVM<T>> {
    const ruta = `${this.ruta}/Asign`;
    return this.cliente.post<ResultVM<T>>(ruta, modelo).toPromise();
  }

  async notAsign(modelo: T): Promise<ResultVM<T>> {
    const ruta = `${this.ruta}/NotAsign`;
    return this.cliente.post<ResultVM<T>>(ruta, modelo).toPromise();
  }

  obtenerExcel(): Observable<Blob> {
    const ruta = `${this.ruta}/DescargarExcel`;
    return this.cliente
      .post(ruta, null, {
        responseType: 'blob' as 'blob',
      })
      .pipe(
        map((res: Blob) => {
          return res;
        })
      );
  }

  // async ConexiontHubMenu() {
  //   this.hubconexion = new signalR.HubConnectionBuilder()
  //     .withUrl(this.referencia)
  //     .build();
  //   this.hubconexion.on('Guardar', async (x) => {
  //     this.cambio.next(true);
  //   });

  //   this.hubconexion.on('Actualizar', async (x) => {
  //     this.cambio.next(true);
  //   });

  //   this.hubconexion.on('Eliminar', async (x) => {
  //     this.cambio.next(true);
  //   });

  //   this.hubconexion.on('Activar', async (x) => {
  //     this.cambio.next(true);
  //   });

  //   this.hubconexion.on('Desactivar', async (x) => {
  //     this.cambio.next(true);
  //   });

  //   this.hubconexion
  //     .start()
  //     .then((v) => console.log('Conexion, SignalR'))
  //     .catch((v) => {
  //       // console.log('Error hub en conexion SignalR!' + v);
  //     });
  // }


}


