import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Credencial } from '../models/seguridad/credencial';
import { ContextoService } from '../services/contexto.service';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  readonly propiedadCredencial = 'credencialPro';
  readonly propiedadPerfil = 'perfilPro';
  rutaRedireccion: string;
  public get credencial(): Credencial {
    const credencialTexto = window.localStorage.getItem(
      this.propiedadCredencial
    );
    if (credencialTexto) {
      return JSON.parse(credencialTexto);
    }
    return undefined;
  }

  constructor(private router: Router, private ctx: ContextoService,   private logger: NGXLogger) {}
  asignarCredencial(credencial: Credencial): void {
    window.localStorage.setItem(this.propiedadCredencial,JSON.stringify(credencial));
  }
  public get ingreso(): boolean {
    const credencial = window.localStorage.getItem(this.propiedadCredencial);
    if (!credencial) {
      return false;
    }
    return true;
  }

  async salir(): Promise<void> {
    try {
      const respuesta = await this.ctx.salida.cerrarSesion(this.credencial).toPromise();
      if (respuesta.isSuccess) {
        window.localStorage.removeItem(this.propiedadCredencial);
        this.router.navigate(['/autenticacion/login']);
      } else {
      }
    } catch (error) {
      this.logger.error(error);
    }

  }

  accesoRestringido(): void {
    this.router.navigate(['AccesoRestringido']);
  }

  public obtenerCredencial(): Credencial {
    const json = window.localStorage.getItem(this.propiedadCredencial);
    if (!json) {
      return {
        token: '',
        expira: null,
        tokenActualizable: '',
        codigoPerfil: '',
        perfilDescripcion: '',
        nombreCompleto: '',
        codigoUsuario: '',
        menus: null,
        sesion: null,
        lenguaje: '',
        fotoPerfil:"",
        usuarioId: null,
        rfc: '',
        correo: '',
      };
    }
    return JSON.parse(json);
  }

  public obtenerToken(): string {
    return this.obtenerCredencial().token;
  }

}
