import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeguridadRutas } from './seguridad.routing';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { FormaPantallasComponent } from './pantallas/forma-pantallas/forma-pantallas.component';
import { CompPantallasComponent } from './pantallas/comp-pantallas/comp-pantallas.component';
import { CompMenusComponent } from './menus/comp-menus/comp-menus.component';
import { FormaMenusComponent } from './menus/forma-menus/forma-menus.component';
import { CompPantallaPorMenuComponent } from './pantalla-por-menu/comp-pantalla-por-menu/comp-pantalla-por-menu.component';
import { FormaPantallaPorMenuComponent } from './pantalla-por-menu/forma-pantalla-por-menu/forma-pantalla-por-menu.component';
import { CompUsuarioComponent } from './usuarios/comp-usuario/comp-usuario.component';
import { FormaUsuarioComponent } from './usuarios/forma-usuario/forma-usuario.component';
import { ComPerfilesComponent } from './perfiles/com-perfiles/com-perfiles.component';
import { FormaPerfilesComponent } from './perfiles/forma-perfiles/forma-perfiles.component';
import { FormaPermisosComponent } from './permisos/forma-permisos/forma-permisos.component';
import { CompPermisosComponent } from './permisos/comp-permisos/comp-permisos.component';
import { PipesModule } from 'src/app/pipes/filtro.module';
import { CompPantallaPorPerfilComponent } from './pantalla-por-perfil/comp-pantalla-por-perfil/comp-pantalla-por-perfil.component';
import { FormaPantallaPorPerfilComponent } from './pantalla-por-perfil/forma-pantalla-por-perfil/forma-pantalla-por-perfil.component';
import { CompPermisoPorPerfilComponent } from './permiso-por-perfil/comp-permiso-por-perfil/comp-permiso-por-perfil.component';

@NgModule({
  declarations: [
    CompMenusComponent,
    FormaPantallasComponent,
    CompPantallasComponent,
    CompMenusComponent,
    FormaMenusComponent,
    CompPantallaPorMenuComponent,
    FormaPantallaPorMenuComponent,
    CompUsuarioComponent,
    FormaUsuarioComponent,
    ComPerfilesComponent,
    FormaPerfilesComponent,
    FormaPermisosComponent,
    CompPermisosComponent,
    CompPantallaPorPerfilComponent,
    FormaPantallaPorPerfilComponent,
    CompPermisoPorPerfilComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SeguridadRutas),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    PipesModule,
  ],
  exports:[]
})
export class SeguridadModule {}
