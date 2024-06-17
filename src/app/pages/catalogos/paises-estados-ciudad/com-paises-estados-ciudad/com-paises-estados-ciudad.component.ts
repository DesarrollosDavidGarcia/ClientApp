import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Mensaje } from 'src/app/models/utils/mensaje-basico';
import { FormaMensajeBasicoComponent } from 'src/app/pages/utileria/mensaje-basico/forma-mensaje-basico/forma-mensaje-basico.component';
import { ContextoService } from 'src/app/services/contexto.service';
import { ServicioAlerta } from 'src/app/services/mensaje.service';
import { SweetAlertIcon } from 'sweetalert2';
import { ResultVM } from 'src/app/models/utils/resultVM';
import { Bancos } from 'src/app/models/catalogos/bancos';
import { UrlEnpoint } from 'src/app/models/utils/url-enpoint';
import { Paises } from 'src/app/models/catalogos/paises';


@Component({
  selector: 'app-com-paises-estados-ciudad',
  templateUrl: './com-paises-estados-ciudad.component.html',
  styleUrls: ['./com-paises-estados-ciudad.component.scss']
})
export class CompPaisesEstadosCiudadComponent implements OnInit, OnDestroy {


  constructor(public ventana: MatDialog, public ctx: ContextoService, public alerta: ServicioAlerta, private logger: NGXLogger) {}

  async ngOnInit(): Promise<void> {
    await this.tabla();
  }

  ngAfterViewInit() {
   
  }

  async tabla(): Promise<void> {
    try {
      let resultado = await this.ctx.paises.getAll();
    if (resultado.data.length > 0) {
    
    }else{
    
    }
  
    } catch (error) {
      this.alerta.mostrarMensaje('Error interno del sistema...', 'error');
      this.logger.error(error);
    }
  }

  abrirForma(modelo?: Bancos): void {
    // let dato = modelo?.id ? modelo : null;
    // let forma = this.ventana.open(FormaBancosComponent, { data: dato, panelClass: 'form-container' });
    // forma.componentInstance.guardado.subscribe(() => { this.tabla(); });
  }

  filtrar(filterValue: string) {
  
  }
 

  limpiarFiltro(): void {
   
  }

  descargarExcel(): void {}

  ngOnDestroy(): void {

  }

  async importar() {
    try {
      let model: UrlEnpoint = new UrlEnpoint();
      model.path = "CatalogosSAC/ObtenerPaisesAsync";
      let respuestaPaisesSAC = await this.ctx.paises.getAllSAC(model);
      console.dir(respuestaPaisesSAC.data)
      if (respuestaPaisesSAC.isSuccess) {
        let respuesta = await this.ctx.paises.addList(respuestaPaisesSAC.data);
      } 



      let modelEstados: UrlEnpoint = new UrlEnpoint();
      modelEstados.path = "CatalogosSAC/ObtenerEstadosAsync";
      let respuestaEstadosSAC = await this.ctx.estados.getAllSAC(modelEstados);
      if (respuestaEstadosSAC.isSuccess) {
        let respuesta = await this.ctx.estados.addList(respuestaEstadosSAC.data);
      } 


      let modelCiudades: UrlEnpoint = new UrlEnpoint();
      modelCiudades.path = "CatalogosSAC/ObtenerCiudadesAsync";
      let respuestaCiudadesSAC = await this.ctx.ciudades.getAllSAC(modelCiudades);
      if (respuestaCiudadesSAC.isSuccess) {
        let respuesta = await this.ctx.ciudades.addList(respuestaCiudadesSAC.data);
      } 

      this.alerta.mostrarMensaje('Ubicaciones registrados con exito', 'success');

      await this.tabla();
    } catch (error) {
    }
  }
}

