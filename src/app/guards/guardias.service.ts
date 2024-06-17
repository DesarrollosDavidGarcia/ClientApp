import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { ContextoService } from '../services/contexto.service';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class GuardiaAcceso implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(
    private autenticacion: AutenticacionService,
    private router: Router,
    private ctx: ContextoService,
    private logger: NGXLogger,
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<boolean> {
    try {
      const url: string = state.url;
      if (!this.autenticacion.ingreso) {
        if(this.autenticacion.credencial)
        {
          let respuesta = await this.ctx.salida.cerrarSesion(this.autenticacion.credencial).toPromise();
          if(respuesta.isSuccess)
          {
            this.autenticacion.rutaRedireccion = url;
            this.router.navigate(['/autenticacion/login']);
            return false;
          }

        }else{
          this.autenticacion.rutaRedireccion = url;
          this.router.navigate(['/autenticacion/login']);
          return false;
        }
      }
    } catch (error) {
      this.logger.error(error);
    }

    return true;
  }
}
