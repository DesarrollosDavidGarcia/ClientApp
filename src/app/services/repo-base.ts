import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export abstract class RepoBase<T> {
  private readonly _ruta: string;
  private readonly _rutaCors: string;

  get ruta() {
    return this._ruta;
  }
  get cliente() {
    return this.http;
  }

  get rutaCors() {
    return this._rutaCors;
  }
  private connection = environment.connectionAPI;
  constructor(private http: HttpClient, controlador: string) {
    this._ruta = this.connection +'/api/' + controlador;
    this._rutaCors= this.connection +'/api/' + controlador;
  }
}
