import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { SeguridadModule } from './pages/seguridad/seguridad.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { GuardiaAcceso } from './guards/guardias.service';
import { NegocioModule } from './pages/negocio/negocio.module';
import { ErroresInternosModule } from './pages/errores-internos/error-interno.module';
import { CandidatosModule } from './pages/candidatos/candidatos.module';
import { CatalogosModule } from './pages/catalogos/catalogos.module';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [GuardiaAcceso],
    children: [
      {
        path: 'dashboards',
        loadChildren: () => DashboardsModule
      },
      {
        path: 'seguridad',
        loadChildren: () => SeguridadModule,
      },
      {
        path: 'negocio',
        loadChildren: () => NegocioModule,
      },
      {
        path: 'erroresinternos',
        loadChildren: () => ErroresInternosModule,
      },
      {
        path: 'candidatos',
        loadChildren: () => CandidatosModule,
      },
      {
        path: 'catalogos',
        loadChildren: () => CatalogosModule,
      },


    ],
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'autenticacion',
        loadChildren: () => AuthenticationModule
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'autenticacion/404',
  },
  {
    path: '/hangfire',
  },
];
