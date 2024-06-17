import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { PipesModule } from 'src/app/pipes/filtro.module';
import { FormaPrincipalCandidatosComponent } from './on-boarding/forma-principal/forma-principal.component';
import { CandidatosRutas } from './candidatos.routing';
import { FormaStepperContentComponent } from './on-boarding/forma-stepper-content/forma-stepper-content.component';
import { FormaDatosBasicosComponent } from './on-boarding/forma-datos-basicos/forma-datos-basicos.component';
import { FormaDireccionActualComponent } from './on-boarding/forma-direccion-actual/forma-direccion-actual.component';
import { FormaContactosComponent } from './on-boarding/forma-seccion-contactos-familiares/forma-contactos/forma-contactos.component';
import { FormaGeneralComponent } from './on-boarding/estado-salud/general/forma-general.component';
import { FormaHabitosComponent } from './on-boarding/estado-salud/habitos/forma-habitos.component';
import { FormaHistorialClinicoComponent } from './on-boarding/estado-salud/historial-clinico/forma-historial-clinico.component';
import { FormaDocumentacionComponent } from './on-boarding/carga-documentos/forma-documentacion/forma-documentacion.component';
import { CompInicioCandidatoComponent } from './on-boarding/comp-inicio-candidato/comp-inicio-candidato.component';
import { CompReportOnBordingComponent } from './report-on-boarding/report-on-boarding.component';
 

@NgModule({
  declarations: [
    FormaPrincipalCandidatosComponent,
    FormaStepperContentComponent,
    FormaDatosBasicosComponent,
    FormaDireccionActualComponent,
    FormaContactosComponent,
    FormaGeneralComponent,
    FormaHabitosComponent,
    FormaHistorialClinicoComponent,
    FormaDocumentacionComponent,
    CompInicioCandidatoComponent,
    CompReportOnBordingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CandidatosRutas),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    PipesModule,
  ],
  exports:[]
})
export class CandidatosModule {}
