import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AutenticacionService } from 'src/app/guards/autenticacion.service';
import { SeguimientoCandidato } from 'src/app/models/onboarding/candidato';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';

@Component({
  selector: 'app-comp-inicio-candidato',
  templateUrl: './comp-inicio-candidato.component.html',
  styleUrls: ['./comp-inicio-candidato.component.scss'],
})
export class CompInicioCandidatoComponent implements OnInit, OnDestroy {



  nombreCompleto: string = "";
  seguimiento: SeguimientoCandidato = new SeguimientoCandidato();
  avance: number = 0;
  constructor(
    public ventana: MatDialog,
    private ctx: ContextoService,
    private alerta: ServicioAlerta,
    private logger: NGXLogger,
    private auth: AutenticacionService,
    private router: Router,
  ) {


    console.log(this.auth.credencial.correo);

  }

  async ngOnInit(): Promise<void> {
    await this.cargarDatosCandidato();
  }

  public async cargarDatosCandidato() {

    
    let respuesta: ResultVM<SeguimientoCandidato>;
    try {
      let respuesta = await this.ctx.seguimientoCandidato.obtenerSeguimientosCandidatoPorCorreo(this.auth.credencial.correo);
      if (respuesta.isSuccess) {
        this.seguimiento = respuesta.data;
        this.avance = respuesta.data.avance;
        this.nombreCompleto = this.seguimiento.nombre + " " + this.seguimiento.apellidoPaterno + " " + this.seguimiento.apellidoMaterno;
      } else {

      }
    } catch (error) {

    }
  }

  async ngAfterViewInit() {

  }

  ngOnDestroy() {
  }

  irSeguimiento(){
    this.router.navigateByUrl("/candidatos/onboarding/" + this.seguimiento.id + "/" + this.seguimiento.correoElectronico);

  }
}
