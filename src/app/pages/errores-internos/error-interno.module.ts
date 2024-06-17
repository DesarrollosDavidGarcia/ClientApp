import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { ErroresInternosRutas } from './error-interno.routing';
import { CompErroresInternoClienteComponent } from './error-interno-cliente/comp-error-interno-cliente.component';
import { CompErroresInternoServidorComponent } from './error-interno-servidor/comp-error-interno-servidor.component';

@NgModule({
  declarations: [

    CompErroresInternoClienteComponent,
    CompErroresInternoServidorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ErroresInternosRutas),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  exports:[]
})
export class ErroresInternosModule {}
