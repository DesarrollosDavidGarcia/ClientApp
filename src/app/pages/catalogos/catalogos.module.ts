import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
 
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { FormaGenerosComponent } from './generos/forma-generos/forma-generos.component';
import { CompGenerosComponent } from './generos/comp-generos/comp-generos.component';
import { PipesModule } from 'src/app/pipes/filtro.module';
import { CatalogosRutas } from './catalogos.routing';
import { FormaSintomasMedicosComponent } from './sintomas-medicos/forma-sintomas-medicos/forma-sintomas-medicos.component';
import { CompSintomasMedicosComponent } from './sintomas-medicos/comp-sintomas-medicos/comp-sintomas-medicos.component';
import { CompParentescosComponent } from './parentescos/comp-parentescos/comp-parentescos.component';
import { FormaParentescosComponent } from './parentescos/forma-parentescos/forma-parentescos.component';
import { CompEstadoCivilComponent } from './estado-civil.ts/comp-estado-civil/comp-estado-civil.component';
import { FormaEstadoCivilComponent } from './estado-civil.ts/forma-estado-civil/forma-estado-civil.component';
import { CompRelacionParentalComponent } from './relacion-parental/comp-relacion-parental/comp-relacion-parental.component';
import { FormaRelacionParentalComponent } from './relacion-parental/forma-relacion-parental/forma-relacion-parental.component';
import { FormaBancosComponent } from './bancos/forma-bancos/forma-bancos.component';
import { CompBancosComponent } from './bancos/comp-bancos/comp-bancos.component';
import { FormaCategoriaDocumentosComponent } from './categorias-documentos/forma-categoria-documentos/forma-categoria-documentos.component';
import { CompCategoriaDocumentoComponent } from './categorias-documentos/comp-categoria-documentos/comp-categoria-documentos.component';
import { CompGradoEscolarComponent } from './grados-escolares/comp-grados-escolares/comp-grados-escolares.component';
import { FormaGradosEscolaresComponent } from './grados-escolares/forma-grados-escolares/forma-grados-escolares.component';
import { FormaEmpresasComponent } from './empresas/forma-empresas/forma-empresas.component';
import { CompEmpresasComponent } from './empresas/comp-empresas/comp-empresas.component';
import { FormaPuestosInternosComponent } from './puestos-internos/forma-puestos-internos/forma-puestos-internos.component';
import { CompPuestosInternosComponent } from './puestos-internos/comp-puestos-internos/comp-puestos-internos.component';
import { FormaEstatusComponent } from './estatus/forma-estatus/forma-estatus.component';
import { CompEstatusComponent } from './estatus/comp-estatus/comp-estatus.component';
import { CompPaisesEstadosCiudadComponent } from './paises-estados-ciudad/com-paises-estados-ciudad/com-paises-estados-ciudad.component';
 

@NgModule({
  declarations: [
    CompGenerosComponent,
    FormaGenerosComponent,
    CompSintomasMedicosComponent,
    FormaSintomasMedicosComponent,
    CompParentescosComponent,
    FormaParentescosComponent,
    CompEstadoCivilComponent,
    FormaEstadoCivilComponent,
    CompRelacionParentalComponent,
    FormaRelacionParentalComponent,
    FormaBancosComponent,
    CompBancosComponent,
    CompCategoriaDocumentoComponent,
    FormaCategoriaDocumentosComponent,
    CompGradoEscolarComponent,
    FormaGradosEscolaresComponent,
    FormaEmpresasComponent,
    CompEmpresasComponent,
    FormaPuestosInternosComponent,
    CompPuestosInternosComponent,
    FormaEstatusComponent,
    CompEstatusComponent,
    CompPaisesEstadosCiudadComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CatalogosRutas),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    PipesModule,
  ],
  exports:[]
})
export class CatalogosModule {}
