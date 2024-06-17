import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CargandosComponent } from './cargando.component';

@NgModule({
  declarations: [
  ],
  imports: [
    NgxSpinnerModule
  ],
  exports:[],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CargandoModule {}
